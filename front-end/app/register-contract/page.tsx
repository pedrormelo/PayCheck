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
import { Check, Plus, Paperclip, X } from "lucide-react"
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

  const today = new Date().toISOString().split("T")[0]

  const [idEmp, setIdEmp] = useState("")
  const [idComp, setIdComp] = useState("")
  const [idStatus, setIdStatus] = useState("")
  const [dataVen, setDataVen] = useState(today)
  const [valor, setValor] = useState("")
  const [dataUltPag, setDataUltPag] = useState(today)
  const [pdfFile, setPdfFile] = useState<File | null>(null)

  const [empresas, setEmpresas] = useState<{ idEmp: number; nomeEmp: string }[]>([])
  const [competencias, setCompetencias] = useState<{ idComp: number; mesPag: string; anoPag: string }[]>([])
  const [statusList, setStatusList] = useState<{ idStatus: number; nomeStatus: string }[]>([])

  useEffect(() => {
    api.get("/empresas").then((res) => setEmpresas(res.data))
    api.get("/competencia").then((res) => setCompetencias(res.data))
    api.get("/status").then((res) => setStatusList(res.data))
  }, [])

  const isValorValid = (v: string) => /^\d+(\.\d{1,2})?$/.test(v)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      if (file.type !== "application/pdf") {
        toast({ title: "Formato inválido", description: "Selecione um arquivo PDF.", variant: "destructive" })
        return
      }

      if (file.size > 10 * 1024 * 1024) {
        toast({ title: "Arquivo muito grande", description: "O limite é 10MB.", variant: "destructive" })
        return
      }

      setPdfFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!idEmp || !idComp || !idStatus || !dataVen || !valor || !dataUltPag) {
      return toast({ title: "Preencha todos os campos", variant: "destructive" })
    }

    if (!isValorValid(valor)) {
      return toast({
        title: "Valor inválido",
        description: "Informe um número válido com até duas casas decimais",
        variant: "destructive",
      })
    }

    try {
      const res = await api.post("/contratos", {
        idEmp,
        idStatus,
        idComp,
        dataVen,
        valor,
      })

      const contratoId = res.data.contratoId

      await api.post(`/pagamentos`, {
        idContrato: contratoId,
        idComp: Number(idComp),
        valorPago: valor ? Number(valor) : 0,
        observacao: null,
        dataPag: dataUltPag,
      })

      if (pdfFile) {
        const form = new FormData()
        form.append("pdfContrato", pdfFile)
        await api.post(`/contratos/${contratoId}/upload`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      }

      toast({ title: "Contrato cadastrado com sucesso", variant: "success" })
      addNotification({
        title: "Novo contrato",
        message: `Contrato #${contratoId} criado.`,
        type: "success",
      })
      router.push("/")
    } catch (err) {
      console.error(err)
      toast({ title: "Erro ao cadastrar contrato", variant: "destructive" })
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
                    <Button variant="outline" size="icon" className="bg-black text-white h-8 w-8 p-0 rounded-full">
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
                <Input type="date" className="bg-gray-100" value={dataVen} onChange={(e) => setDataVen(e.target.value)} />
              </div>

              {/* VALOR */}
              <div>
                <label className="block text-sm font-medium mb-1">VALOR</label>
                <Input
                  type="text"
                  placeholder="R$ 0.00"
                  className="bg-gray-100"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </div>

              {/* ÚLTIMO PAGAMENTO */}
              <div>
                <label className="block text-sm font-medium mb-1">ÚLTIMO PAGAMENTO</label>
                <Input type="date" className="bg-gray-100" value={dataUltPag} onChange={(e) => setDataUltPag(e.target.value)} />
              </div>
            </div>

            {/* BOTÃO DE ANEXO */}
            <div>
              <label className="block text-sm font-medium mb-1">ANEXO:</label>
              <div className="flex items-start gap-2">
                <Button asChild variant="outline" size="sm" className="gap-1">
                  <label className="cursor-pointer flex items-center gap-1">
                    <Paperclip className="h-4 w-4" />
                    {pdfFile ? "Alterar PDF" : "Anexar PDF do Contrato"}
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </Button>

                {pdfFile && (
                  <div className="flex items-center gap-2 text-sm">
                    <span>{pdfFile.name}</span>
                    <button type="button" onClick={() => setPdfFile(null)} className="text-red-600 hover:text-red-800">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Anexe o contrato em formato PDF (tamanho máximo: 10MB)</p>
            </div>

            {/* SUBMIT */}
            <div className="flex justify-center mt-8">
              <Button type="submit" size="icon" className="bg-black text-white rounded-full h-8 w-8">
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </PageLayout>
  )
}
