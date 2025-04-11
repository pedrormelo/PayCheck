"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Download, Paperclip, Check, Plus } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import PageLayout from "@/app/components/page-layout"
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
import { useState } from "react"

export default function EditContract() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const { toast } = useToast()
  const { addNotification } = useNotifications()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // In a real app, you would fetch the contract data based on the ID
  const contractData = {
    id: id,
    empresa: "Empresa A",
    competencia: "Janeiro 2025",
    situacao: "Ativo",
    dataVen: "2025-01-15",
    valor: "5000.00",
    anexo: "contrato.pdf",
    ultimoPagamento: "2025-01-05", // Added last payment date
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Show toast notification
    toast({
      title: "Contrato atualizado",
      description: `O contrato #${id} foi atualizado com sucesso`,
      variant: "success",
    })

    // Add to notification center
    addNotification({
      title: "Contrato atualizado",
      message: `Contrato #${id} foi atualizado`,
      type: "info",
    })

    // Navigate back to contract details
    router.push(`/contract-details/${id}`)

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
    <PageLayout title="Editar Contrato">
      <form onSubmit={handleSubmit}>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 border">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">EMPRESA</label>
                <div className="flex items-center gap-2">
                  <div className="flex-grow">
                    <Select defaultValue={contractData.empresa}>
                      <SelectTrigger className="bg-gray-100">
                        <SelectValue placeholder="Selecione a empresa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Empresa A">Empresa A</SelectItem>
                        <SelectItem value="Empresa B">Empresa B</SelectItem>
                        <SelectItem value="Empresa C">Empresa C</SelectItem>
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

              <div>
                <label className="block text-sm font-medium mb-1">COMPETÊNCIA</label>
                <Select defaultValue={contractData.competencia}>
                  <SelectTrigger className="bg-gray-100">
                    <SelectValue placeholder="Selecione a competência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Janeiro 2025">Janeiro 2025</SelectItem>
                    <SelectItem value="Fevereiro 2025">Fevereiro 2025</SelectItem>
                    <SelectItem value="Março 2025">Março 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">SITUAÇÃO</label>
                <Select defaultValue={contractData.situacao}>
                  <SelectTrigger className="bg-gray-100">
                    <SelectValue placeholder="Selecione a situação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">DATA VEN:</label>
                <Input type="date" defaultValue={contractData.dataVen} className="bg-gray-100" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">VALOR:</label>
                <Input type="text" defaultValue={contractData.valor} className="bg-gray-100" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">ÚLTIMO PAGAMENTO:</label>
                <Input type="date" defaultValue={contractData.ultimoPagamento} className="bg-gray-100" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ANEXO:</label>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm">{contractData.anexo}</span>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Paperclip className="h-4 w-4" />
                  Anexar arquivo
                </Button>
              </div>
            </div>

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
    </PageLayout>
  )
}
