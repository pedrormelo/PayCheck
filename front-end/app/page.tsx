"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import Link from "next/link"
import PageLayout from "./components/page-layout"
import { ContractExpirationAlert } from "@/components/contract-expiration-alert"
import { useToast } from "@/hooks/use-toast"
import { useNotifications } from "@/hooks/use-notifications"

export default function Home() {
  const { toast } = useToast()
  const { addNotification } = useNotifications()

  // Sample data for the table
  const contracts = [
    {
      id: "123",
      empresa: "Empresa A",
      competencia: "01/2024",
      situacao: "Em dia",
      dataVen: "10/01/2024",
      dataRen: "10/01/2025",
      valor: "1000",
    },
    {
      id: "456",
      empresa: "Empresa B",
      competencia: "02/2024",
      situacao: "Atrasado",
      dataVen: "10/02/2024",
      dataRen: "10/02/2025",
      valor: "2000",
    },
  ]

  return (
    <PageLayout>
      {/* Contract Expiration Alert */}
      <ContractExpirationAlert />

      <div className="flex flex-col md:flex-row items-center gap-2 w-full mb-4">
        <div className="relative w-full md:w-auto flex-grow">
          <Input
            placeholder="buscar ID ou nome do contrato..."
            className="pl-4 pr-10 py-2 bg-black text-white placeholder-gray-400 rounded-md w-full"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            className="bg-black text-white border-gray-600 rounded-md px-4 py-2 flex items-center gap-1"
          >
            situação
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1"
            >
              <path d="M6 9L2 5H10L6 9Z" fill="white" />
            </svg>
          </Button>

          <Button
            variant="outline"
            className="bg-black text-white border-gray-600 rounded-md px-4 py-2 flex items-center gap-1"
          >
            competência
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1"
            >
              <path d="M6 9L2 5H10L6 9Z" fill="white" />
            </svg>
          </Button>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-md border border-gray-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  EMPRESA
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  COMPETÊNCIA
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  SITUAÇÃO
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  DATA VEN
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  DATA REN
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  VALOR
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {contracts.map((contract, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <Link href={`/contract-details/${contract.id}`} className="hover:underline">
                      {contract.id}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{contract.empresa}</td>
                  <td className="px-4 py-2">{contract.competencia}</td>
                  <td className="px-4 py-2">{contract.situacao}</td>
                  <td className="px-4 py-2">{contract.dataVen}</td>
                  <td className="px-4 py-2">{contract.dataRen}</td>
                  <td className="px-4 py-2">{contract.valor}</td>
                </tr>
              ))}
              {contracts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    Nenhum contrato encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Link href="/register-contract">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-black text-white h-10 w-10"
            onClick={() => {
              toast({
                title: "Novo contrato",
                description: "Iniciando cadastro de novo contrato",
                variant: "info",
              })
            }}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </Link>
        <Button variant="outline" size="icon" className="rounded-full bg-black text-white h-10 w-10">
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </PageLayout>
  )
}
