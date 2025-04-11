"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"
import PageLayout from "@/app/components/page-layout"
import { DashboardSummary } from "@/components/dashboard-summary"
import { ContractExpirationAlert } from "@/components/contract-expiration-alert"

export default function Dashboard() {
  // Sample data for the dashboard
  const contracts = [
    {
      id: "123",
      empresa: "Empresa A",
      competencia: "01/2024",
      situacao: "Em dia",
      dataVen: "10/01/2024",
      dataRen: "10/01/2025",
      valor: "1000",
      ultimoPagamento: "05/01/2024",
      mesesAtrasados: 0,
    },
    {
      id: "456",
      empresa: "Empresa B",
      competencia: "02/2024",
      situacao: "Atrasado",
      dataVen: "10/02/2024",
      dataRen: "10/02/2025",
      valor: "2000",
      ultimoPagamento: "15/11/2023",
      mesesAtrasados: 2,
    },
  ]

  // Calculate summary data
  const totalContracts = contracts.length
  const activeContracts = contracts.filter((c) => c.situacao === "Em dia").length
  const pendingContracts = contracts.filter((c) => c.situacao === "Atrasado").length
  const latePayments = contracts.filter((c) => c.mesesAtrasados > 0).length
  const totalValue = contracts
    .reduce((sum, contract) => sum + Number.parseInt(contract.valor), 0)
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })

  return (
    <PageLayout title="Dashboard">
      {/* Contract Expiration Alert */}
      <ContractExpirationAlert />

      {/* Dashboard Summary */}
      <DashboardSummary
        totalContracts={totalContracts}
        activeContracts={activeContracts}
        pendingContracts={pendingContracts}
        latePayments={latePayments}
        totalValue={totalValue}
      />

      {/* Recent Payments */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Pagamentos Recentes</h3>
        <div className="bg-white rounded-lg shadow-sm p-4 border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4 text-sm font-medium">Contrato</th>
                <th className="text-left py-2 px-4 text-sm font-medium">Empresa</th>
                <th className="text-left py-2 px-4 text-sm font-medium">Data</th>
                <th className="text-left py-2 px-4 text-sm font-medium">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4">123</td>
                <td className="py-2 px-4">Empresa A</td>
                <td className="py-2 px-4">05/01/2024</td>
                <td className="py-2 px-4">R$ 1.000,00</td>
              </tr>
              <tr>
                <td className="py-2 px-4">456</td>
                <td className="py-2 px-4">Empresa B</td>
                <td className="py-2 px-4">15/11/2023</td>
                <td className="py-2 px-4">R$ 2.000,00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Payments */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Próximos Vencimentos</h3>
        <div className="bg-white rounded-lg shadow-sm p-4 border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4 text-sm font-medium">Contrato</th>
                <th className="text-left py-2 px-4 text-sm font-medium">Empresa</th>
                <th className="text-left py-2 px-4 text-sm font-medium">Vencimento</th>
                <th className="text-left py-2 px-4 text-sm font-medium">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4">123</td>
                <td className="py-2 px-4">Empresa A</td>
                <td className="py-2 px-4">10/01/2024</td>
                <td className="py-2 px-4">R$ 1.000,00</td>
              </tr>
              <tr>
                <td className="py-2 px-4">456</td>
                <td className="py-2 px-4">Empresa B</td>
                <td className="py-2 px-4">10/02/2024</td>
                <td className="py-2 px-4">R$ 2.000,00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/">
          <Button size="icon" className="bg-black text-white rounded-full h-8 w-8">
            <Check className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </PageLayout>
  )
}
