"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Download, Upload, Edit, Clock, DollarSign, AlertTriangle, CircleSlash } from "lucide-react"
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

export default function ContractDetails() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const { toast } = useToast()
  const { addNotification } = useNotifications()

  // Sample contract data
  const [status, setStatus] = useState("ATIVO")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showPaymentAlert, setShowPaymentAlert] = useState(false)
  const [monthsLate, setMonthsLate] = useState(0)

  const contract = {
    id: id,
    competencia: "MARÇO/2025",
    dataVen: "10/03/2025",
    dataRen: "10/03/2026",
    empresa: "EMPRESA PADRÃO",
    valor: "R$ 65.000,00",
    anexo: "contrato.pdf",
    ultimoPagamento: "15/01/2025",
  }

  // Calculate months late
  useEffect(() => {
    // In a real app, this would be calculated based on actual payment data
    // For now, we'll simulate it
    const today = new Date()
    const lastPaymentDate = new Date(
      Number.parseInt(contract.ultimoPagamento.split("/")[2]),
      Number.parseInt(contract.ultimoPagamento.split("/")[1]) - 1,
      Number.parseInt(contract.ultimoPagamento.split("/")[0]),
    )

    const diffTime = today.getTime() - lastPaymentDate.getTime()
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30))

    // Assuming monthly payments, subtract 1 to get months late (1 month grace period)
    const late = Math.max(0, diffMonths - 1)
    setMonthsLate(late)
  }, [contract.ultimoPagamento])

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)

    // Show toast notification
    toast({
      title: "Status atualizado",
      description: `O status do contrato foi alterado para ${newStatus}`,
      variant: "success",
    })

    // Add to notification center
    addNotification({
      title: "Status de contrato alterado",
      message: `Contrato #${id} alterado para ${newStatus}`,
      type: "info",
    })

    // In a real app, you would save this to your backend
  }

  const handleDeleteContract = () => {
    // Close the dialog
    setShowDeleteDialog(false)

    // Show toast notification
    toast({
      title: "Contrato excluído",
      description: `O contrato #${id} foi excluído com sucesso`,
      variant: "success",
    })

    // Add to notification center
    addNotification({
      title: "Contrato excluído",
      message: `Contrato #${id} foi excluído permanentemente`,
      type: "warning",
    })

    // Navigate back to home page
    router.push("/")

    // In a real app, you would delete this from your backend
  }

  return (
    <PageLayout title={`Detalhes do Contrato #${id}`}>
      <div className="bg-gray-200 rounded-md p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm font-medium mb-1">ID:</div>
            <div className="bg-white p-2 rounded">{contract.id}</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">DATA VEN:</div>
            <div className="bg-white p-2 rounded">{contract.dataVen}</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">COMPETÊNCIA:</div>
            <div className="bg-white p-2 rounded">{contract.competencia}</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">DATA REN (PREVISTO):</div>
            <div className="bg-white p-2 rounded">{contract.dataRen}</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">EMPRESA:</div>
            <div className="bg-white p-2 rounded">{contract.empresa}</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">VALOR:</div>
            <div className="bg-white p-2 rounded">{contract.valor}</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">ÚLTIMO PAGAMENTO:</div>
            <div className="bg-white p-2 rounded">{contract.ultimoPagamento}</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">MESES ATRASADOS:</div>
            <div className="flex items-center gap-2">
              <div
                className={`bg-white p-2 rounded flex-grow flex items-center ${
                  monthsLate > 0 ? "text-black-600 font-medium" : ""
                }`}
              >
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
            <div className="text-sm font-medium mb-1">STATUS:</div>
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded flex-grow flex items-center">
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    status === "ATIVO" ? "bg-green-600" : status === "PENDENTE" ? "bg-amber-400" : "bg-red-600"
                  }`}
                ></span>
                {status}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-black text-white h-8 w-8 p-0 rounded-full">
                    <CircleSlash className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleStatusChange("ATIVO")}>
                    <span className="text-green-600 mr-2">●</span> ATIVO
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange("PENDENTE")}>
                    <span className="text-amber-400 mr-2">●</span> PENDENTE
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange("CANCELADO")}>
                    <span className="text-red-600 mr-2">●</span> CANCELADO
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">ANEXO:</div>
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded flex-grow">{contract.anexo}</div>
              <Button variant="outline" size="sm" className="bg-black text-white h-8 w-8 p-0 rounded-full">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-black text-white h-8 w-8 p-0 rounded-full">
                <Upload className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-black text-white h-8 w-8 p-0 rounded-full">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {/* Delete button */}
          <Button
            variant="outline"
            size="icon"
            className="bg-black text-white rounded-full h-8 w-8"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          {/* Payment register button (cash register) */}
          <Link href={`/payment-register/${id}`}>
            <Button variant="outline" size="icon" className="bg-black text-white rounded-full h-8 w-8">
              <DollarSign className="h-4 w-4" />
            </Button>
          </Link>

          {/* History button (clock) */}
          <Link href={`/payment-history/${id}`}>
            <Button variant="outline" size="icon" className="bg-black text-white rounded-full h-8 w-8">
              <Clock className="h-4 w-4" />
            </Button>
          </Link>

          {/* Edit button (pencil) */}
          <Link href={`/edit-contract/${id}`}>
            <Button variant="outline" size="icon" className="bg-black text-white rounded-full h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
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

      {/* Payment Alert Dialog */}
      <AlertDialog open={showPaymentAlert} onOpenChange={setShowPaymentAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-amber-500">
              <AlertTriangle className="h-5 w-5" />
              Pagamento Atrasado
            </AlertDialogTitle>
            <div className="text-sm text-muted-foreground space-y-4">
              Este contrato está com {monthsLate} {monthsLate === 1 ? "mês" : "meses"} de atraso. Último pagamento em{" "}
              {contract.ultimoPagamento}.<div className="pt-2">Deseja registrar um novo pagamento agora?</div>
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
