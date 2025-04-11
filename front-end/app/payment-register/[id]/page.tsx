"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check } from "lucide-react"
import PageLayout from "@/app/components/page-layout"
import { useParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useNotifications } from "@/hooks/use-notifications"

export default function PaymentRegister() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const { toast } = useToast()
  const { addNotification } = useNotifications()

  // Get today's date in YYYY-MM-DD format for the default value
  const today = new Date().toISOString().split("T")[0]
  const [paymentDate, setPaymentDate] = useState(today)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Format the date for display (DD/MM/YYYY)
    const formattedDate = new Date(paymentDate).toLocaleDateString("pt-BR")

    // Show toast notification
    toast({
      title: "Pagamento registrado",
      description: `O pagamento para o contrato #${id} foi registrado com sucesso`,
      variant: "success",
    })

    // Add to notification center
    addNotification({
      title: "Novo pagamento",
      message: `Pagamento registrado para o contrato #${id} em ${formattedDate}`,
      type: "success",
    })

    // Navigate back to contract details
    router.push(`/contract-details/${id}`)

    // In a real app, you would save this to your backend
  }

  return (
    <PageLayout title={`Registrar Pagamento - Contrato ${id}`}>
      <form onSubmit={handleSubmit}>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 border">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">DATA DO PAGAMENTO</label>
                <Input
                  type="date"
                  className="bg-gray-100"
                  required
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">VALOR</label>
                <Input type="text" placeholder="R$ 0,00" className="bg-gray-100" required />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">OBSERVAÇÕES</label>
                <Textarea
                  className="bg-gray-100 min-h-[100px]"
                  placeholder="Adicione informações relevantes sobre este pagamento. Estas observações serão visíveis no histórico de pagamentos."
                />
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
