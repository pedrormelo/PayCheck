import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Plus } from "lucide-react"
import Link from "next/link"
import PageLayout from "@/app/components/page-layout"

export default function RegisterContract() {
  return (
    <PageLayout title="Cadastrar Contrato">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 border">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-3">
              <label className="block text-sm font-medium mb-1">empresa</label>
              <div className="flex items-center gap-2">
                <div className="flex-grow">
                  <Select>
                    <SelectTrigger className="bg-gray-100">
                      <SelectValue placeholder="Selecione a empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Empresa A">Empresa A</SelectItem>
                      <SelectItem value="Empresa B">Empresa B</SelectItem>
                      <SelectItem value="Empresa C">Empresa C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Link href="/register-company">
                  <Button variant="outline" size="icon" className="bg-black text-white h-8 w-8 p-0 rounded-full">
                    <Plus className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">competência</label>
              <Select>
                <SelectTrigger className="bg-gray-100">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Janeiro 2025">Janeiro 2025</SelectItem>
                  <SelectItem value="Fevereiro 2025">Fevereiro 2025</SelectItem>
                  <SelectItem value="Março 2025">Março 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">situação</label>
              <Select>
                <SelectTrigger className="bg-gray-100">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">DATA VENCIMENTO</label>
              <Input type="date" className="bg-gray-100" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">VALOR</label>
              <Input type="text" placeholder="R$ 0,00" className="bg-gray-100" />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/">
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
