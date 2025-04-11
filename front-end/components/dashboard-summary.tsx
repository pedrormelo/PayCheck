"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Clock, DollarSign } from "lucide-react"

interface DashboardSummaryProps {
  totalContracts: number
  activeContracts: number
  pendingContracts: number
  latePayments: number
  totalValue: string
}

export function DashboardSummary({
  totalContracts,
  activeContracts,
  pendingContracts,
  latePayments,
  totalValue,
}: DashboardSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total de Contratos</CardTitle>
          <div className="flex items-center justify-center w-5 h-5">
            <CheckCircle className="h-4 w-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalContracts}</div>
          <p className="text-xs text-muted-foreground">
            {activeContracts} ativos, {pendingContracts} pendentes
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Pagamentos Atrasados</CardTitle>
          <div className="flex items-center justify-center w-5 h-5">
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{latePayments}</div>
          <p className="text-xs text-muted-foreground">{latePayments > 0 ? "Atenção necessária" : "Todos em dia"}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
          <div className="flex items-center justify-center w-5 h-5">
            <DollarSign className="h-4 w-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalValue}</div>
          <p className="text-xs text-muted-foreground">Valor total dos contratos ativos</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Próximos Vencimentos</CardTitle>
          <div className="flex items-center justify-center w-5 h-5">
            <Clock className="h-4 w-4 text-orange-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">Nos próximos 30 dias</p>
        </CardContent>
      </Card>
    </div>
  )
}
