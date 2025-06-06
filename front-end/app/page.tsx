"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import Link from "next/link"
import PageLayout from "./components/page-layout"
import { ContractExpirationAlert } from "@/components/contract-expiration-alert"
import { useToast } from "@/hooks/use-toast"
import { useNotifications } from "@/hooks/use-notifications"
import api from "@/lib/api"

const formatDate = (dateStr: string) => {
    if (!dateStr) return "--"
    return new Date(dateStr).toLocaleDateString("pt-BR", { timeZone: "UTC" })
}

const formatCurrency = (value: number | string) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(Number(value))
}

export default function Home() {
    const { toast } = useToast()
    const { addNotification } = useNotifications()

    const [contracts, setContracts] = useState<any[]>([])
    const [filteredContracts, setFilteredContracts] = useState<any[]>([])
    const [search, setSearch] = useState("")
    const [filtroStatus, setFiltroStatus] = useState("")
    const [filtroComp, setFiltroComp] = useState("")
    const [statusList, setStatusList] = useState<string[]>([])
    const [competenciaList, setCompetenciaList] = useState<string[]>([])

    useEffect(() => {
        api.get("/contratos").then((res) => {
            const contratos = res.data

            setContracts(contratos)
            setFilteredContracts(contratos)

            // Gerar listas únicas para filtros
            const statusSet = new Set<string>()
            const compSet = new Set<string>()

            contratos.forEach((c: any) => {
                if (c.nomeStatus) statusSet.add(String(c.nomeStatus))
                if (c.mesPag && c.anoPag) compSet.add(`${c.mesPag}/${c.anoPag}`)
            })

            setStatusList(Array.from(statusSet))
            setCompetenciaList(Array.from(compSet))
        })
    }, [])

    useEffect(() => {
        const filtered = contracts.filter((contract) => {
            const matchesSearch =
                search === "" ||
                contract.idContrato?.toString().includes(search) ||
                contract.nomeEmp?.toLowerCase().includes(search.toLowerCase())

            const matchesStatus = filtroStatus === "" || contract.nomeStatus === filtroStatus

            const competencia = `${contract.mesPag}/${contract.anoPag}`
            const matchesComp = filtroComp === "" || competencia === filtroComp

            return matchesSearch && matchesStatus && matchesComp
        })

        setFilteredContracts(filtered)
    }, [search, filtroStatus, filtroComp, contracts])

    return (
        <PageLayout>
            <ContractExpirationAlert />

            <div className="flex flex-col md:flex-row items-center gap-3 w-full mb-4">
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="buscar ID ou nome da empresa..."
                    className="pl-4 pr-10 py-2 bg-black text-white placeholder-gray-400 rounded-full w-full focus:ring-2 focus:ring-orange-500/50"
                />

                <select
                    className="bg-black text-white rounded-full px-4 py-2 min-w-[120px] cursor-pointer"
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value)}
                >
                    <option value="">situação</option>
                    {statusList.map((s, i) => (
                        <option key={i} value={s}>{s}</option>
                    ))}
                </select>

                <select
                    className="bg-black text-white rounded-full px-4 py-2 min-w-[140px] max-h-[200px] overflow-y-auto cursor-pointer"
                    value={filtroComp}
                    onChange={(e) => setFiltroComp(e.target.value)}
                >
                    <option value="">competência</option>
                    {competenciaList.map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            <div className="w-full overflow-hidden rounded-lg border border-gray-300 shadow-sm">
                <div style={{ height: "360px" }} className="overflow-y-auto custom-scrollbar">
                    <table className="w-full table-fixed">
                        <thead className="sticky top-0 z-10 bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-[10%]">ID</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-[20%]">EMPRESA</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-[15%]">COMPETÊNCIA</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-[15%]">SITUAÇÃO</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-[15%]">DATA VEN</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-[15%]">DATA REN</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-[15%]">VALOR</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-100">
                            {filteredContracts.map((contract, index) => (
                                <tr key={index} className="hover:bg-gray-200 transition-colors">
                                    <td className="px-4 py-2 truncate">
                                        <Link href={`/contract-details/${contract.idContrato}`} className="hover:underline text-blue-600">
                                            {contract.idContrato}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2 truncate">{contract.nomeEmp}</td>
                                    <td className="px-4 py-2 truncate">{`${contract.mesPag}/${contract.anoPag}`}</td>
                                    <td className="px-4 py-2 truncate">{contract.nomeStatus}</td>
                                    <td className="px-4 py-2 truncate">{formatDate(contract.dataVen)}</td>
                                    <td className="px-4 py-2 truncate">{formatDate(contract.dataRen)}</td>
                                    <td className="px-4 py-2 truncate">{formatCurrency(contract.valor)}</td>
                                </tr>
                            ))}
                            {filteredContracts.length === 0 && (
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
                        className="rounded-full bg-black text-white h-10 w-10 hover:bg-gray-800 transition-colors"
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
            </div>
        </PageLayout>
    )
}
