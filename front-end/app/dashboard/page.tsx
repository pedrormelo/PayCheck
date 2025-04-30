"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"
import PageLayout from "@/app/components/page-layout"
import { DashboardSummary } from "@/components/dashboard-summary"
import { ContractExpirationAlert } from "@/components/contract-expiration-alert"
import api from "@/lib/api"

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalContracts: 0,
    activeContracts: 0,
    pendingContracts: 0,
    latePayments: 0,
    totalValue: "R$ 0,00",
  })

  const [recentPayments, setRecentPayments] = useState<any[]>([])
  const [upcomingContracts, setUpcomingContracts] = useState<any[]>([])
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [resumo, pagamentos, vencimentos] = await Promise.all([
          api.get("/dashboard/resumo"),
          api.get("/dashboard/pagamentos-recentes"),
          api.get("/dashboard/vencimentos"),
        ])

        setSummary(resumo.data)
        setRecentPayments(pagamentos.data)
        setUpcomingContracts(vencimentos.data)

        if (vencimentos.data.length > 0) setShowAlert(true)
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <PageLayout title="Dashboard">
      {showAlert && <ContractExpirationAlert />}

      <DashboardSummary {...summary} />

      {/* Pagamentos Recentes */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Pagamentos Recentes</h3>
        <div className="bg-white rounded-lg shadow-sm p-4 border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Contrato</th>
                <th className="text-left py-2 px-4">Empresa</th>
                <th className="text-left py-2 px-4">Data</th>
                <th className="text-left py-2 px-4">Valor</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((p, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2 px-4">{p.idContrato}</td>
                  <td className="py-2 px-4">{p.nomeEmp}</td>
                  <td className="py-2 px-4">{new Date(p.dataPag).toLocaleDateString("pt-BR")}</td>
                  <td className="py-2 px-4">
                    {Number(p.valorPago).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Próximos Vencimentos */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Próximos Vencimentos</h3>
        <div className="bg-white rounded-lg shadow-sm p-4 border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Contrato</th>
                <th className="text-left py-2 px-4">Empresa</th>
                <th className="text-left py-2 px-4">Vencimento</th>
                <th className="text-left py-2 px-4">Valor</th>
              </tr>
            </thead>
            <tbody>
              {upcomingContracts.map((c, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2 px-4">{c.idContrato}</td>
                  <td className="py-2 px-4">{c.nomeEmp}</td>
                  <td className="py-2 px-4">{new Date(c.dataVen).toLocaleDateString("pt-BR")}</td>
                  <td className="py-2 px-4">
                    {Number(c.valor).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ação final */}
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
