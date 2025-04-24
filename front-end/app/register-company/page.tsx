"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Trash2 } from "lucide-react"
import PageLayout from "@/app/components/page-layout"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useNotifications } from "@/hooks/use-notifications"
import api from "@/lib/api"

export default function RegisterCompany() {
  const [nomeEmp, setNomeEmp] = useState("")
  const [empresas, setEmpresas] = useState<any[]>([])

  const router = useRouter()
  const { toast } = useToast()
  const { addNotification } = useNotifications()

  const carregarEmpresas = () => {
    api.get("/empresas").then((res) => {
      setEmpresas(res.data)
    })
  }

  useEffect(() => {
    carregarEmpresas()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!nomeEmp.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "O nome da empresa é obrigatório.",
        variant: "destructive",
      })
      return
    }

    try {
      await api.post("/empresas", { nomeEmp })
      toast({
        title: "Empresa cadastrada",
        description: "Empresa adicionada com sucesso.",
        variant: "success",
      })

      addNotification({
        title: "Nova empresa",
        message: `Empresa "${nomeEmp}" foi cadastrada com sucesso.`,
        type: "success",
      })

      setNomeEmp("")
      carregarEmpresas()
      router.push("/register-contract")
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao cadastrar empresa.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (idEmp: number) => {
    if (!confirm("Tem certeza que deseja excluir esta empresa?")) return

    try {
      await api.delete(`/empresas/${idEmp}`)
      toast({
        title: "Empresa excluída",
        description: "Empresa removida com sucesso.",
        variant: "default",
      })
      carregarEmpresas()
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: "Verifique se essa empresa está em uso em algum contrato.",
        variant: "destructive",
      })
    }
  }

  return (
    <PageLayout title="Cadastrar Empresa">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white border rounded-lg shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">NOME DA EMPRESA</label>
          <Input
            type="text"
            placeholder="Digite o nome da empresa"
            className="bg-gray-100"
            value={nomeEmp}
            onChange={(e) => setNomeEmp(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <Button type="submit" size="icon" className="bg-black text-white rounded-full h-8 w-8">
            <Check className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <div className="max-w-2xl mx-auto mt-6">
        <h3 className="text-sm font-semibold mb-2 text-gray-600">Empresas cadastradas</h3>
        {empresas.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhuma empresa cadastrada.</p>
        ) : (
          <ul className="space-y-2">
            {empresas.map((empresa) => (
              <li
                key={empresa.idEmp}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md"
              >
                <span className="text-sm">{empresa.nomeEmp}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(empresa.idEmp)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageLayout>
  )
}
