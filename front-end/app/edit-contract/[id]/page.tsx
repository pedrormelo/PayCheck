"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Download, Paperclip, Check, Plus, X } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import PageLayout from "@/app/components/page-layout"
import { useToast } from "@/hooks/use-toast"
import { useNotifications } from "@/hooks/use-notifications"
import api from "@/lib/api"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function EditContract() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const { toast } = useToast()
  const { addNotification } = useNotifications()

  const [idEmp, setIdEmp] = useState("")
  const [idComp, setIdComp] = useState("")
  const [idStatus, setIdStatus] = useState("")
  const [dataVen, setDataVen] = useState("")
  const [valor, setValor] = useState("")
  const [dataUltPag, setDataUltPag] = useState("")
  const [pdfFile, setPdfFile] = useState<File | null>(null)

  const [empresas, setEmpresas] = useState<{ idEmp: number; nomeEmp: string }[]>([])
  const [competencias, setCompetencias] = useState<{ idComp: number; mesPag: string; anoPag: string }[]>([])
  const [statusList, setStatusList] = useState<{ idStatus: number; nomeStatus: string }[]>([])

  const [anexoAtual, setAnexoAtual] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    api.get("/empresas").then((res) => setEmpresas(res.data))
    api.get("/competencia").then((res) => setCompetencias(res.data))
    api.get("/status").then((res) => setStatusList(res.data))

    api.get(`/contratos/${id}`).then((res) => {
      const contrato = res.data
      if (contrato) {
        setIdEmp(contrato.idEmp.toString())
        setIdComp(contrato.idComp.toString())
        setIdStatus(contrato.idStatus.toString())
        setDataVen(contrato.dataVen.split("T")[0])
        setValor(contrato.valor.toString())
        setDataUltPag(contrato.dataUltPag?.split("T")[0] || "")
        setAnexoAtual(`contrato_${contrato.idContrato}.pdf`)
      }
    })
  }, [id])

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

    if (!idEmp || !idStatus || !idComp || !dataVen || !valor) {
      return toast({ title: "Preencha todos os campos", variant: "destructive" })
    }

    try {
      await api.put(`/contratos/${id}`, {
        idEmp,
        idStatus,
        idComp,
        dataVen,
        valor,
      })

      await api.post(`/pagamentos`, {
        idContrato: Number(id),
        idComp: Number(idComp),
        valorPago: valor ? Number(valor) : 0,
        observacao: null,
        dataPag: dataUltPag,
      })

      if (pdfFile) {
        const form = new FormData()
        form.append("pdfContrato", pdfFile)
        await api.post(`/contratos/${id}/upload`, form)
      }

      toast({ title: "Contrato atualizado com sucesso", variant: "success" })
      addNotification({ title: "Contrato atualizado", message: `Contrato #${id} foi atualizado`, type: "info" })
      router.push(`/contract-details/${id}`)
    } catch (err) {
      console.error(err)
      toast({ title: "Erro ao atualizar contrato", variant: "destructive" })
    }
  }

  const handleDeleteContract = async () => {
    setShowDeleteDialog(false)
    try {
      await api.delete(`/contratos/${id}`)
      toast({ title: "Contrato excluído", description: `Contrato #${id} foi excluído.`, variant: "success" })
      router.push("/")
    } catch (err) {
      console.error(err)
      toast({ title: "Erro ao excluir contrato", variant: "destructive" })
    }
  }

  return (
    <PageLayout title="Editar Contrato">
      <form onSubmit={handleSubmit}>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 border">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* EMPRESA */}
              <div>
                <label className="block text-sm font-medium mb-1">EMPRESA</label>
                <Select value={idEmp} onValueChange={setIdEmp}>
                  <SelectTrigger className="bg-gray-100">
                    <SelectValue placeholder="Selecione a empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {empresas.map((e) => (
                      <SelectItem key={e.idEmp} value={e.idEmp.toString()}>
                        {e.nomeEmp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* COMPETÊNCIA */}
              <div>
                <label className="block text-sm font-medium mb-1">COMPETÊNCIA</label>
                <Select value={idComp} onValueChange={setIdComp}>
                  <SelectTrigger className="bg-gray-100">
                    <SelectValue placeholder="Selecione a competência" />
                  </SelectTrigger>
                  <SelectContent>
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
                    <SelectValue placeholder="Selecione a situação" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusList.map((s) => (
                      <SelectItem key={s.idStatus} value={s.idStatus.toString()}>
                        {s.nomeStatus}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* DATA VEN */}
              <div>
                <label className="block text-sm font-medium mb-1">DATA VENCIMENTO</label>
                <Input type="date" className="bg-gray-100" value={dataVen} onChange={(e) => setDataVen(e.target.value)} />
              </div>

              {/* VALOR */}
              <div>
                <label className="block text-sm font-medium mb-1">VALOR</label>
                <Input type="text" className="bg-gray-100" value={valor} onChange={(e) => setValor(e.target.value)} />
              </div>

              {/* ÚLTIMO PAGAMENTO */}
              <div>
                <label className="block text-sm font-medium mb-1">ÚLTIMO PAGAMENTO</label>
                <Input type="date" className="bg-gray-100" value={dataUltPag} onChange={(e) => setDataUltPag(e.target.value)} />
              </div>
            </div>

            {/* ANEXO */}
            <div>
              <label className="block text-sm font-medium mb-1">ANEXO:</label>
              <div className="flex items-center gap-2 mt-2">
                {anexoAtual && <span className="text-sm">{anexoAtual}</span>}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => window.open(`${api.defaults.baseURL}/contratos/${id}/download`, "_blank")}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAnexoAtual(null)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2">
                <Button asChild variant="outline" size="sm" className="gap-1">
                  <label className="cursor-pointer flex items-center gap-1">
                    <Paperclip className="h-4 w-4" />
                    {pdfFile ? "Alterar PDF" : "Anexar PDF do Contrato"}
                    <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
                  </label>
                </Button>
                {pdfFile && (
                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <span>{pdfFile.name}</span>
                    <button type="button" onClick={() => setPdfFile(null)} className="text-red-600 hover:text-red-800">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* AÇÕES */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="bg-black text-white"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button type="submit" size="icon" className="bg-black text-white">
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* CONFIRMAÇÃO DE EXCLUSÃO */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o contrato #{id}? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteContract} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  )
}
