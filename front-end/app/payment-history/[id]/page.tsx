"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import PageLayout from "@/app/components/page-layout"
import { useParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
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

  const id = params.id as string

  const [historico, setHistorico] = useState<Pagamento[]>([])
  const [ultimoPagamento, setUltimoPagamento] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [modalObs, setModalObs] = useState<string>("")
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null)

  const fetchPagamentos = () => {
    api.get(`/pagamentos/${id}/historico`).then((res) => {
      setHistorico(res.data.historico || [])
      if (res.data.ultimoPagamento) {
        const formatted = new Date(res.data.ultimoPagamento).toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "long",
        })
        // Capitaliza o primeiro caractere
        setUltimoPagamento(formatted.charAt(0).toUpperCase() + formatted.slice(1))
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    if (id) fetchPagamentos()
  }, [id])

  const handleDelete = async (idPagamento: number) => {
    try {
      await api.delete(`/pagamentos/${idPagamento}`)
      toast({
        title: "Pagamento removido",
        description: `O pagamento #${idPagamento} foi excluído com sucesso.`,
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

  return (
    <PageLayout title={`Histórico de Pagamentos - Contrato ${id}`}>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 border space-y-4">
        <div className="bg-gray-100 p-3 rounded-md mb-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-medium">Último pagamento:</span>
              <span className="ml-2">{ultimoPagamento || "Nenhum pagamento registrado"}</span>
            </div>
            <Link href={`/payment-register/${id}`}>
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
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Data</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Valor</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Observações</th>
                <th className="px-4 py-2 w-8"></th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">Carregando...</td>
                </tr>
              ) : historico.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">Nenhum pagamento registrado</td>
                </tr>
              ) : (
                historico.map((payment) => (
                  <tr key={payment.idPagamento} className="border-t border-gray-200">
                    <td className="px-4 py-2">
                      {new Date(payment.dataPag).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-2">
                      R$ {Number(payment.valorPago).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-2">
                      <span className={payment.status === "Pago" ? "text-green-600" : "text-yellow-600"}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {payment.observacao && payment.observacao.length > 20
                        ? `${payment.observacao.substring(0, 20)}...`
                        : payment.observacao || "-"}
                      {payment.observacao && payment.observacao.length > 20 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-6 w-6 p-0"
                          title="Ver observação completa"
                          onClick={() => setModalObs(payment.observacao || "")}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      )}
                    </td>
                    <td className="px-2 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => setConfirmDeleteId(payment.idPagamento)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {modalObs && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
              <h2 className="text-lg font-semibold mb-2">Observação completa</h2>
              <p className="text-sm text-gray-700 whitespace-pre-line">{modalObs}</p>
              <div className="flex justify-end mt-4">
                <Button onClick={() => setModalObs("")}>Fechar</Button>
              </div>
            </div>
          </div>
        )}

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
          <Link href={`/contract-details/${id}`}>
            <Button size="icon" className="bg-black text-white rounded-full h-8 w-8">
              <Check className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
