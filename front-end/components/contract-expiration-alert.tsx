"use client"

import { useEffect, useState } from "react"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useNotifications } from "@/hooks/use-notifications"

interface Contract {
  id: string
  empresa: string
  dataVen: string
}

export function ContractExpirationAlert() {
  const [expiringContracts, setExpiringContracts] = useState<Contract[]>([])
  const { addNotification } = useNotifications()

  useEffect(() => {
    // In a real app, you would fetch this data from your backend
    // This is just a simulation
    const contracts = [
      { id: "123", empresa: "Empresa A", dataVen: "2025-04-15" },
      { id: "456", empresa: "Empresa B", dataVen: "2025-04-20" },
    ]

    // Check for contracts expiring in the next 30 days
    const today = new Date()
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(today.getDate() + 30)

    const expiring = contracts.filter((contract) => {
      const expirationDate = new Date(contract.dataVen)
      return expirationDate > today && expirationDate <= thirtyDaysFromNow
    })

    setExpiringContracts(expiring)

    // Add notifications for expiring contracts
    expiring.forEach((contract) => {
      const daysUntilExpiration = Math.ceil(
        (new Date(contract.dataVen).getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      )

      addNotification({
        title: "Contrato próximo do vencimento",
        message: `Contrato #${contract.id} (${contract.empresa}) vence em ${daysUntilExpiration} dias`,
        type: "warning",
      })
    })
  }, [addNotification])

  if (expiringContracts.length === 0) {
    return null
  }

  return (
    <Alert variant="warning" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Contratos próximos do vencimento</AlertTitle>
      <AlertDescription>
        {expiringContracts.length === 1 ? (
          <p>
            O contrato #{expiringContracts[0].id} ({expiringContracts[0].empresa}) está próximo do vencimento.
          </p>
        ) : (
          <p>
            Existem {expiringContracts.length} contratos próximos do vencimento. Verifique a lista de notificações para
            mais detalhes.
          </p>
        )}
      </AlertDescription>
    </Alert>
  )
}
