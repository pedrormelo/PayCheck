"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
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

export default function RegisterCompany() {
  const router = useRouter()
  const { toast } = useToast()
  const { addNotification } = useNotifications()
  const [companyToDelete, setCompanyToDelete] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Sample data for existing companies
  const [companies, setCompanies] = useState(["EMPRESA 1", "EMPRESA 2", "EMPRESA 3"])
  const [newCompanyName, setNewCompanyName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newCompanyName.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite o nome da empresa",
        variant: "destructive",
      })
      return
    }

    // Add the new company to the list
    setCompanies([...companies, newCompanyName.toUpperCase()])
    setNewCompanyName("")

    // Show toast notification
    toast({
      title: "Empresa cadastrada",
      description: "A empresa foi cadastrada com sucesso",
      variant: "success",
    })

    // Add to notification center
    addNotification({
      title: "Nova empresa",
      message: `A empresa ${newCompanyName.toUpperCase()} foi cadastrada no sistema`,
      type: "success",
    })

    // In a real app, you would save this to your backend
  }

  const confirmDeleteCompany = (company: string) => {
    setCompanyToDelete(company)
    setShowDeleteDialog(true)
  }

  const handleDeleteCompany = () => {
    if (companyToDelete) {
      // Remove company from list
      setCompanies(companies.filter((company) => company !== companyToDelete))

      // Show toast notification
      toast({
        title: "Empresa excluída",
        description: `A empresa ${companyToDelete} foi excluída com sucesso`,
        variant: "success",
      })

      // Add to notification center
      addNotification({
        title: "Empresa excluída",
        message: `A empresa ${companyToDelete} foi excluída do sistema`,
        type: "warning",
      })

      // Close the dialog and reset company to delete
      setShowDeleteDialog(false)
      setCompanyToDelete(null)

      // In a real app, you would delete this from your backend
    }
  }

  return (
    <PageLayout title="Cadastrar Empresa">
      <form onSubmit={handleSubmit}>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 border">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">NOME DA EMPRESA</label>
              <Input
                placeholder="Digite o nome da empresa"
                className="bg-gray-100"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
              />
            </div>

            <div>
              <h2 className="text-lg font-medium mb-2">EMPRESAS</h2>
              <div className="space-y-2 border rounded-md p-4 bg-gray-100">
                {companies.map((company, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-md">
                    <span>{company}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-100"
                      onClick={() => confirmDeleteCompany(company)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {companies.length === 0 && (
                  <div className="p-4 text-center text-sm text-gray-500">Nenhuma empresa cadastrada</div>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button type="submit" size="icon" className="bg-black text-white rounded-full h-8 w-8">
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
              Tem certeza que deseja excluir a empresa {companyToDelete}? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCompanyToDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCompany} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  )
}
