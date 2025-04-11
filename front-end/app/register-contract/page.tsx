"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Plus, Paperclip } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import PageLayout from "@/app/components/page-layout"
import { useToast } from "@/hooks/use-toast"
import { useNotifications } from "@/hooks/use-notifications"

export default function RegisterContract() {
  const router = useRouter()
  const { toast } = useToast()
  const { addNotification } = useNotifications()

  // Get today's date in YYYY-MM-DD format for the default value
  const today = new Date().toISOString().split("T")[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Show toast notification
    toast({
      title: "Contrato cadastrado",
      description: "O contrato foi cadastrado com sucesso",
      variant: "success",
    })

    // Add to notification center
    addNotification({
      title: "Novo contrato",
      message: "Um novo contrato foi cadastrado no sistema",
      type: "success",
    })

    // Navigate back to home page
    router.push("/")

    // In a real app, you would save this to your backend
  }

  return (
    <PageLayout title="Cadastrar Contrato">
      <form onSubmit={handleSubmit}>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 border">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-3">
                <label className="block text-sm font-medium mb-1">EMPRESA</label>
                <div className="flex items-center gap-2">
                  <div className="flex-grow">
                    <Select>
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
                <Select>
                  <SelectTrigger className="bg-gray-100">
                    <SelectValue placeholder="Selecione" />
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
                <Select>
                  <SelectTrigger className="bg-gray-100">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">DATA VENCIMENTO</label>
                <Input type="date" className="bg-gray-100" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">VALOR</label>
                <Input type="text" placeholder="R$ 0,00" className="bg-gray-100" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">ÚLTIMO PAGAMENTO</label>
                <Input type="date" className="bg-gray-100" defaultValue={today} />
              </div>
            </div>

            {/* File attachment section */}
            <div>
              <label className="block text-sm font-medium mb-1">ANEXO:</label>
              <div className="mt-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Paperclip className="h-4 w-4" />
                  Anexar arquivo
                </Button>
                <p className="text-xs text-gray-500 mt-1">Anexe o contrato em formato PDF (tamanho máximo: 10MB)</p>
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
    </PageLayout>
  )
}
