"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Download, Edit, Clock, DollarSign, AlertTriangle, CircleSlash } from "lucide-react"
import Link from "next/link"
import PageLayout from "@/app/components/page-layout"
import { useParams, useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { useNotifications } from "@/hooks/use-notifications"
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
import api from "@/lib/api"

export default function ContractDetails() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const { toast } = useToast()
  const { addNotification } = useNotifications()

  const [situacao, setSituacao] = useState("PAGO")
  const [situacaoList, setSituacaoList] = useState<any[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showPaymentAlert, setShowPaymentAlert] = useState(false)
  const [monthsLate, setMonthsLate] = useState(0)
  const [contract, setContract] = useState<any>(null)

  const situacaoColor = (s: string) => {
    switch (s) {
      case "PAGO":
      case "LIQUIDAÇÃO":
        return "bg-green-600"
      case "EMPENHO":
        return "bg-amber-400"
      case "ASSINATURA GESTOR":
      case "ASSINATURA ORDENADOR":
        return "bg-blue-500"
      default:
        return "bg-gray-400"
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contractRes, statusRes, atrasoRes, historicoRes] = await Promise.all([
          api.get(`/contratos/${id}`),
          api.get("/status"),
          api.get(`/pagamentos/${id}/atraso`),
          api.get(`/pagamentos/${id}/historico`),
        ])

        const contractData = contractRes.data
        const ultimoPagamento = historicoRes.data.ultimoPagamento || null

        setContract({
          ...contractData,
          ultimoPagamento: ultimoPagamento
            ? new Date(ultimoPagamento).toLocaleDateString("pt-BR")
            : null,
          hasAttachment: true,
        })

        setSituacao(contractData.nomeStatus)
        setSituacaoList(statusRes.data)
        setMonthsLate(atrasoRes.data.mesesAtraso || 0)
      } catch (err) {
        console.error("Erro ao carregar dados do contrato:", err)
      }
    }

    if (id) fetchData()
  }, [id])

  const handleSituacaoChange = async (newStatus: string) => {
    const statusObj = situacaoList.find((s: any) => s.nomeStatus === newStatus)
    if (!statusObj) return

    try {
      await api.put(`/contratos/${id}/status`, { idStatus: statusObj.idStatus })
      setSituacao(newStatus)
      toast({ title: "Situação atualizada", description: `A situação do contrato foi alterada para ${newStatus}`, variant: "success" })
      addNotification({ title: "Situação alterada", message: `Contrato #${id} agora está como ${newStatus}`, type: "info" })
    } catch (error) {
      toast({ title: "Erro ao atualizar situação", variant: "destructive" })
    }
  }

  if (!contract) return null

  return (
    <PageLayout title={`Detalhes do Contrato #${id}`}>
      <div className="bg-gray-200 rounded-md p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm font-medium mb-1">ID:</div>
            <div className="bg-white p-2 rounded">{contract.idContrato}</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">DATA VEN:</div>
            <div className="bg-white p-2 rounded">{new Date(contract.dataVen).toLocaleDateString("pt-BR")}</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">COMPETÊNCIA:</div>
            <div className="bg-white p-2 rounded">{contract.competencia}</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">DATA REN (PREVISTO):</div>
            <div className="bg-white p-2 rounded">{new Date(contract.dataRen).toLocaleDateString("pt-BR")}</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">EMPRESA:</div>
            <div className="bg-white p-2 rounded">{contract.nomeEmp}</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">VALOR:</div>
            <div className="bg-white p-2 rounded">R$ {Number(contract.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">ÚLTIMO PAGAMENTO:</div>
            <div className="bg-white p-2 rounded">
              {contract.ultimoPagamento || "Não registrado"}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">MESES ATRASADOS:</div>
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded flex-grow">
                {monthsLate > 0 ? `${monthsLate} ${monthsLate === 1 ? "MÊS" : "MESES"}` : "Em dia"}
              </div>
              {monthsLate > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-orange-100 text-orange-600 h-8 w-8 p-0 rounded-full"
                  onClick={() => setShowPaymentAlert(true)}
                >
                  <AlertTriangle className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">SITUAÇÃO:</div>
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded flex-grow flex items-center">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${situacaoColor(situacao)}`}></span>
                {situacao}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-black text-white h-8 w-8 p-0 rounded-full">
                    <CircleSlash className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {situacaoList.map((s) => (
                    <DropdownMenuItem key={s.idStatus} onClick={() => handleSituacaoChange(s.nomeStatus)}>
                      <span className={`mr-2 ${situacaoColor(s.nomeStatus)} w-3 h-3 rounded-full inline-block`}></span>
                      {s.nomeStatus}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">ANEXO:</div>
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded flex-grow">
                {contract.hasAttachment ? `contrato_${contract.idContrato}.pdf` : "Sem anexo"}
              </div>
              {contract.hasAttachment && (
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-black text-white h-8 w-8 p-0 rounded-full"
                  onClick={() => window.open(`${api.defaults.baseURL}/contratos/${id}/download`, "_blank")}
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          <Link href={`/payment-register/${id}`}>
            <Button variant="outline" size="icon" className="bg-black text-white rounded-full h-8 w-8">
              <DollarSign className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/payment-history/${id}`}>
            <Button variant="outline" size="icon" className="bg-black text-white rounded-full h-8 w-8">
              <Clock className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/edit-contract/${id}`}>
            <Button variant="outline" size="icon" className="bg-black text-white rounded-full h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

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
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showPaymentAlert} onOpenChange={setShowPaymentAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-amber-500">
              <AlertTriangle className="h-5 w-5" />
              Pagamento Atrasado
            </AlertDialogTitle>
            <div className="text-sm text-muted-foreground space-y-4">
              Este contrato está com {monthsLate} {monthsLate === 1 ? "mês" : "meses"} de atraso. 
              Último pagamento em {contract.ultimoPagamento || "não registrado"}.
              <div className="pt-2">Deseja registrar um novo pagamento agora?</div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Fechar</AlertDialogCancel>
            <Link href={`/payment-register/${id}`}>
              <AlertDialogAction className="bg-black hover:bg-gray-800">Registrar pagamento</AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  )
}
