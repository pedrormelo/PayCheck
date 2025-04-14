"use client"

import { AxiosResponse, AxiosError } from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import Link from "next/link"
import PageLayout from "./components/page-layout"
import { ContractExpirationAlert } from "@/components/contract-expiration-alert"
import { useToast } from "@/hooks/use-toast"
import { useNotifications } from "@/hooks/use-notifications"
import { useEffect, useState } from "react"

import api from "@/lib/api"

export default function Home() {
  const { toast } = useToast()
  const { addNotification } = useNotifications()

  const [contracts, setContracts] = useState<any[]>([])
  const [statusList, setStatusList] = useState<string[]>([])
  const [competenciaList, setCompetenciaList] = useState<string[]>([])

  const [search, setSearch] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("")
  const [filtroComp, setFiltroComp] = useState("")

  // Carrega contratos e opções de filtro ao iniciar
  useEffect(() => {
    api.get("/contratos").then((res: AxiosResponse) => setContracts(res.data))
    
    api.get("/status").then((res: AxiosResponse) => {
      const nomes = res.data.map((s: any) => s.nomeStatus)
      setStatusList(nomes)
    })
    
    api.get("/competencia").then((res: AxiosResponse) => {
      const comps = res.data.map((c: any) => `${c.mesPag}/${c.anoPag}`)
      setCompetenciaList(comps)
    })
    
  }, [])

  // Função para aplicar os filtros
  const aplicarFiltros = () => {
    api
      .get("/contratos/filtrar", {
        params: {
          search,
          status: filtroStatus,
          competencia: filtroComp,
        },
      })
      .then((res: AxiosResponse) => setContracts(res.data))
      .catch((err: AxiosError) => console.error("Erro ao filtrar:", err))
  }

  return (
    <PageLayout>
      <ContractExpirationAlert />

      <div className="flex flex-col md:flex-row items-center gap-2 w-full mb-4">
        <div className="relative w-full md:w-auto flex-grow">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="buscar ID ou nome da empresa..."
            className="pl-4 pr-10 py-2 bg-black text-white placeholder-gray-400 rounded-md w-full"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            className="bg-black text-white border-gray-600 rounded-md px-4 py-2"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="">situação</option>
            {statusList.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            className="bg-black text-white border-gray-600 rounded-md px-4 py-2"
            value={filtroComp}
            onChange={(e) => setFiltroComp(e.target.value)}
          >
            <option value="">competência</option>
            {competenciaList.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-md border border-gray-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">EMPRESA</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">COMPETÊNCIA</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">SITUAÇÃO</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">DATA VEN</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">DATA REN</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">VALOR</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {contracts.map((contract, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <Link href={`/contract-details/${contract.idContrato}`} className="hover:underline">
                      {contract.idContrato}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{contract.nomeEmp}</td>
                  <td className="px-4 py-2">{`${contract.mesPag}/${contract.anoPag}`}</td>
                  <td className="px-4 py-2">{contract.nomeStatus}</td>
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

        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-black text-white h-10 w-10"
          onClick={aplicarFiltros}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </PageLayout>
  )
}
