"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Check, Plus, Paperclip } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import PageLayout from "@/app/components/page-layout"
import { useToast } from "@/hooks/use-toast"
import { useNotifications } from "@/hooks/use-notifications"
import api from "@/lib/api"

export default function RegisterContract() {
  const router = useRouter()
  const { toast } = useToast()
  const { addNotification } = useNotifications()

  // --- Estados de formulário ---
  const today = new Date().toISOString().split("T")[0]
  const [idEmp, setIdEmp] = useState("")
  const [idComp, setIdComp] = useState("")
  const [idStatus, setIdStatus] = useState("")
  const [dataVen, setDataVen] = useState(today)
  const [valor, setValor] = useState("")
  const [dataUltPag, setDataUltPag] = useState(today)
  const [pdfFile, setPdfFile] = useState<File | null>(null)

  // --- Listas vinda da API ---
  const [empresas, setEmpresas] = useState<{ idEmp: number; nomeEmp: string }[]>([])
  const [competencias, setCompetencias] = useState<
    { idComp: number; mesPag: string; anoPag: string }[]
  >([])
  const [statusList, setStatusList] = useState<{ idStatus: number; nomeStatus: string }[]>([])

  useEffect(() => {
    api.get("/empresas").then((res) => setEmpresas(res.data))
    api.get("/competencia").then((res) => setCompetencias(res.data))
    api.get("/status").then((res) => setStatusList(res.data))
  }, [])

  // --- Validação simples de "valor" ---
  const isValorValid = (v: string) => /^\d+(\.\d{1,2})?$/.test(v)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1) Campos obrigatórios
    if (!idEmp || !idComp || !idStatus || !dataVen || !valor || !dataUltPag) {
      return toast({ title: "Preencha todos os campos", variant: "destructive" })
    }
    // 2) Valor numérico
    if (!isValorValid(valor)) {
      return toast({ title: "Valor inválido", variant: "destructive" })
    }

    try {
      // 3) Cria contrato
      const res = await api.post("/contratos", {
        idEmp,
        idStatus,
        idComp,
        dataVen,
        valor,
      })
      const contratoId = res.data.contratoId

      // 4) Registra o pagamento inicial
      await api.post(`/pagamentos`, {
        idContrato: contratoId,
        idComp,
        dataPag: dataUltPag,
      })

      // 5) Anexa PDF se houver
      if (pdfFile) {
        const form = new FormData()
        form.append("pdfContrato", pdfFile)
        await api.post(`/contratos/${contratoId}/upload`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      }

      // 6) Sucesso geral
      toast({ title: "Contrato cadastrado com sucesso", variant: "success" })
      addNotification({
        title: "Novo contrato",
        message: `Contrato #${contratoId} criado.`,
        type: "success",
      })
      router.push("/")
    } catch (err) {
      console.error(err)
      toast({ title: "Erro ao cadastrar", variant: "destructive" })
    }
  }

  return (
    <PageLayout title="Cadastrar Contrato">
      <form onSubmit={handleSubmit}>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 border">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* EMPRESA */}
              <div className="col-span-3">
                <label className="block text-sm font-medium mb-1">EMPRESA</label>
                <div className="flex items-center gap-2">
                  <div className="flex-grow">
                    <Select value={idEmp} onValueChange={setIdEmp}>
                      <SelectTrigger className="bg-gray-100">
                        <SelectValue placeholder="Selecione a empresa" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto">
                        {empresas.map((e) => (
                          <SelectItem key={e.idEmp} value={e.idEmp.toString()}>
                            {e.nomeEmp}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Link href="/register-company">
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-black text-white h-8 w-8 p-0 rounded-full"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* COMPETÊNCIA */}
              <div>
                <label className="block text-sm font-medium mb-1">COMPETÊNCIA</label>
                <Select value={idComp} onValueChange={setIdComp}>
                  <SelectTrigger className="bg-gray-100">
                    <SelectValue placeholder="Selecione competência" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {competencias.map((c) => (
                      <SelectItem key={c.idComp} value={c.idComp.toString()}>
                        {`${c.mesPag}/${c.anoPag}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* SITUAÇÃO */}
              <div>
                <label className="block text-sm font-medium mb-1">SITUAÇÃO</label>
                <Select value={idStatus} onValueChange={setIdStatus}>
                  <SelectTrigger className="bg-gray-100">
                    <SelectValue placeholder="Selecione situação" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {statusList.map((s) => (
                      <SelectItem key={s.idStatus} value={s.idStatus.toString()}>
                        {s.nomeStatus}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* DATA VENCIMENTO */}
              <div>
                <label className="block text-sm font-medium mb-1">DATA VENCIMENTO</label>
                <Input
                  type="date"
                  className="bg-gray-100"
                  value={dataVen}
                  onChange={(e) => setDataVen(e.target.value)}
                />
              </div>

              {/* VALOR */}
              <div>
                <label className="block text-sm font-medium mb-1">VALOR</label>
                <Input
                  type="text"
                  placeholder="0.00"
                  className="bg-gray-100"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </div>

              {/* ÚLTIMO PAGAMENTO + ANEXAR */}
              <div>
                <label className="block text-sm font-medium mb-1">ÚLTIMO PAGAMENTO & ANEXO</label>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer bg-gray-100 p-2 rounded">
                    <Paperclip className="h-5 w-5 text-gray-600" />
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => e.target.files && setPdfFile(e.target.files[0])}
                    />
                  </label>
                  <Input
                    type="date"
                    className="bg-gray-100"
                    value={dataUltPag}
                    onChange={(e) => setDataUltPag(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* BOTÃO DE SUBMIT */}
            <div className="flex justify-center mt-8">
              <Button
                type="submit"
                size="icon"
                className="bg-black text-white rounded-full h-8 w-8"
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </PageLayout>
  )
}
