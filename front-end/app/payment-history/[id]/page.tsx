"use client"

import { Button } from "@/components/ui/button"
import { Check, Eye } from "lucide-react"
import Link from "next/link"
import PageLayout from "@/app/components/page-layout"
import { useParams } from "next/navigation"

export default function PaymentHistory() {
  const params = useParams()
  const id = params.id as string

  // Sample payment history data with observations
  const payments = [
    {
      date: "10/01/2025",
      value: "R$ 65.000,00",
      status: "Pago",
      observations: "Pagamento realizado via transferência bancária.",
    },
    {
      date: "10/12/2024",
      value: "R$ 65.000,00",
      status: "Pago",
      observations: "Pagamento com atraso de 2 dias. Multa aplicada.",
    },
    {
      date: "10/11/2024",
      value: "R$ 65.000,00",
      status: "Pago",
      observations: "Pagamento realizado em dia.",
    },
  ]

  return (
    <PageLayout title={`Histórico de Pagamentos - Contrato ${id}`}>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 border">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Observações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-100">
                {payments.map((payment, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-4 py-2">{payment.date}</td>
                    <td className="px-4 py-2">{payment.value}</td>
                    <td className="px-4 py-2">{payment.status}</td>
                    <td className="px-4 py-2">
                      {payment.observations.length > 20
                        ? `${payment.observations.substring(0, 20)}...`
                        : payment.observations}
                      {payment.observations.length > 20 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-6 w-6 p-0"
                          title="Ver observação completa"
                          onClick={() => alert(payment.observations)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
                {payments.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                      Nenhum pagamento registrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-8">
            <Link href={`/contract-details/${id}`}>
              <Button size="icon" className="bg-black text-white rounded-full h-8 w-8">
                <Check className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
