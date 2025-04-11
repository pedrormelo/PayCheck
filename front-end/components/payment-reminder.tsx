"use client"

import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PaymentReminderProps {
  contractId: string
  monthsLate: number
  lastPaymentDate: string
}

export function PaymentReminder({ contractId, monthsLate, lastPaymentDate }: PaymentReminderProps) {
  if (monthsLate === 0) {
    return (
      <Alert variant="success" className="mb-4">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Pagamentos em dia</AlertTitle>
        <AlertDescription>
          Todos os pagamentos deste contrato estão em dia. Último pagamento em {lastPaymentDate}.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert variant="warning" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Pagamento atrasado</AlertTitle>
      <AlertDescription>
        <span className="block">
          Este contrato está com {monthsLate} {monthsLate === 1 ? "mês" : "meses"} de atraso. Último pagamento em{" "}
          {lastPaymentDate}.
        </span>
        <span className="block mt-2">
          <Link href={`/payment-register/${contractId}`}>
            <Button variant="outline" size="sm" className="bg-black text-white mt-2">
              Registrar pagamento
            </Button>
          </Link>
        </span>
      </AlertDescription>
    </Alert>
  )
}
