"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import PageLayout from "@/app/components/page-layout"
import { Button } from "@/components/ui/button"
import { Trash2, Check, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import api from "@/lib/api"

interface Pagamento {
  idPagamento: number
  dataPag: string
  valorPago: number
  observacao?: string
  status: string
}

export default function PaymentHistory() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()

  const idContrato = params.id || ""
  const [historico, setHistorico] = useState<Pagamento[]>([])
  const [ultimoPagamento, setUltimoPagamento] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null)

  const fetchPagamentos = () => {
    api.get(`/pagamentos/${idContrato}/historico`).then((res) => {
      setHistorico(res.data.historico || [])
      setUltimoPagamento(res.data.ultimoPagamento || null)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (idContrato) fetchPagamentos()
  }, [idContrato])

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/pagamentos/${id}`)
      toast({
        title: "Pagamento removido",
        description: `O pagamento #${id} foi excluído com sucesso.`,
        variant: "success",
      })
      setConfirmDeleteId(null)
      fetchPagamentos()
    } catch (err) {
      console.error("Erro ao excluir pagamento:", err)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o pagamento.",
        variant: "destructive",
      })
    }
  }

  const formatarUltimoPagamento = (data: string) => {
    const dataFormatada = new Date(data)
    return dataFormatada.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    }).replace(/^\w/, c => c.toUpperCase()) // primeira letra maiúscula
  }

  const formatarDataTabela = (data: string) => {
    const dataFormatada = new Date(data)
    return dataFormatada.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <PageLayout title={`Histórico de Pagamentos - Contrato ${idContrato}`}>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 border">
        <div className="space-y-4">
          <div className="bg-gray-100 p-3 rounded-md mb-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm font-medium">Último pagamento:</span>
                <span className="ml-2">
                  {ultimoPagamento ? formatarUltimoPagamento(ultimoPagamento) : "Nenhum pagamento registrado"}
                </span>
              </div>
              <Link href={`/payment-register/${idContrato}`}>
                <Button variant="outline" size="sm" className="bg-black text-white">
                  Registrar novo pagamento
                </Button>
              </Link>
            </div>
          </div>

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
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="bg-gray-100">
                {historico.length > 0 ? (
                  historico.map((pagamento) => (
                    <tr key={pagamento.idPagamento} className="border-t border-gray-200">
                      <td className="px-4 py-2">{formatarDataTabela(pagamento.dataPag)}</td>
                      <td className="px-4 py-2">
                        R$ {Number(pagamento.valorPago).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-2">{pagamento.status}</td>
                      <td className="px-4 py-2">
                        {pagamento.observacao && pagamento.observacao.length > 20
                          ? `${pagamento.observacao.substring(0, 20)}...`
                          : pagamento.observacao || "-"}
                        {pagamento.observacao && pagamento.observacao.length > 20 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-6 w-6 p-0"
                            title="Ver observação completa"
                            onClick={() => alert(pagamento.observacao)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        )}
                      </td>
                      <td className="px-2 py-2 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => setConfirmDeleteId(pagamento.idPagamento)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      Nenhum pagamento registrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {confirmDeleteId !== null && (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 shadow-md max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-2">Confirmar exclusão</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Tem certeza que deseja excluir o pagamento #{confirmDeleteId}? Esta ação não pode ser desfeita.
                </p>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>
                    Cancelar
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(confirmDeleteId)}>
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <Link href={`/contract-details/${idContrato}`}>
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
