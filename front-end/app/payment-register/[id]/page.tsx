"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Check } from "lucide-react"
import PageLayout from "@/app/components/page-layout"
import { useToast } from "@/hooks/use-toast"
import api from "@/lib/api"

export default function PaymentRegister() {
  const router = useRouter()
  const { toast } = useToast()
  const params = useSearchParams()

  const idContrato = params.get("id") || ""

  const [competencias, setCompetencias] = useState<any[]>([])
  const [idComp, setIdComp] = useState("")
  const [dataPag, setDataPag] = useState("")
  const [valorPago, setValorPago] = useState("")
  const [observacao, setObservacao] = useState("")

  const today = new Date().toISOString().split("T")[0]

  useEffect(() => {
    api.get("/competencia").then((res) => {
      setCompetencias(res.data)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!idComp || !dataPag || !valorPago) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    try {
      await api.post(`/pagamentos/${idContrato}`, {
        idContrato: Number(idContrato),
        idComp: Number(idComp),
        dataPag,
        valorPago,
        observacao,
      })

      toast({
        title: "Pagamento registrado",
        description: "O pagamento foi registrado com sucesso!",
        variant: "success",
      })

      router.push(`/contract-details/${idContrato}`)
    } catch (err) {
      console.error("Erro ao registrar pagamento:", err)
      toast({
        title: "Erro",
        description: "Não foi possível registrar o pagamento.",
        variant: "destructive",
      })
    }
  }

  return (
    <PageLayout title="Registrar Pagamento">
      <form onSubmit={handleSubmit}>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6 border space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">DATA DO PAGAMENTO</label>
              <Input type="date" className="bg-gray-100" value={dataPag} onChange={(e) => setDataPag(e.target.value)} max={today} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">COMPETÊNCIA</label>
              <Select onValueChange={setIdComp}>
                <SelectTrigger className="bg-gray-100">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="max-h-40 overflow-y-auto">
                  {competencias.map((comp) => (
                    <SelectItem key={comp.idComp} value={String(comp.idComp)}>
                      {`${comp.mesPag}/${comp.anoPag}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">VALOR PAGO</label>
              <Input
                type="text"
                placeholder="R$ 0,00"
                className="bg-gray-100"
                value={valorPago}
                onChange={(e) => setValorPago(e.target.value)}
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">OBSERVAÇÃO</label>
            <textarea
              className="bg-gray-100 border rounded-md w-full px-3 py-2 text-sm"
              placeholder="Adicione informações sobre este pagamento. Estas observações podem ser visualizadas no histórico de pagamentos..."
              rows={4}
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <Button type="submit" size="icon" className="bg-black text-white rounded-full h-8 w-8">
              <Check className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </PageLayout>
  )
}
