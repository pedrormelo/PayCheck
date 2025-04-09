import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"
import Header from "@/app/components/header"
import Footer from "@/app/components/footer"

export default function PaymentHistory({ params }: { params: { id: string } }) {
  // Sample payment history data
  const payments = [
    { date: "10/01/2025", value: "R$ 65.000,00", status: "Pago" },
    { date: "10/12/2024", value: "R$ 65.000,00", status: "Pago" },
    { date: "10/11/2024", value: "R$ 65.000,00", status: "Pago" },
  ]

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold">
              <span className="text-black">Pay</span>
              <span className="text-orange-500">Check!</span>
            </h1>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 border">
            <h2 className="text-2xl font-bold mb-6">Histórico de Pagamentos - Contrato {params.id}</h2>

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
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100">
                    {payments.map((payment, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="px-4 py-2">{payment.date}</td>
                        <td className="px-4 py-2">{payment.value}</td>
                        <td className="px-4 py-2">{payment.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center mt-8">
                <Link href={`/contract-details/${params.id}`}>
                  <Button size="icon" className="bg-black text-white rounded-full h-8 w-8">
                    <Check className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
