import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Download, Paperclip, Check, Plus } from "lucide-react"
import Link from "next/link"
import Header from "@/app/components/header"
import Footer from "@/app/components/footer"

export default function EditContract({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the contract data based on the ID
  const contractData = {
    id: params.id,
    empresa: "Empresa A",
    competencia: "Janeiro 2025",
    situacao: "Ativo",
    dataVen: "2025-01-15",
    valor: "5000.00",
    anexo: "contrato.pdf",
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold">
              <span className="text-black">Pay</span>
              <span className="text-orange-500">Check!</span>
            </h1>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 border">
            <h2 className="text-2xl font-bold mb-6">Editar Contrato</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">empresa</label>
                  <div className="flex items-center gap-2">
                    <Select defaultValue={contractData.empresa} className="flex-grow">
                      <SelectTrigger className="bg-gray-100">
                        <SelectValue placeholder="Selecione a empresa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Empresa A">Empresa A</SelectItem>
                        <SelectItem value="Empresa B">Empresa B</SelectItem>
                        <SelectItem value="Empresa C">Empresa C</SelectItem>
                      </SelectContent>
                    </Select>
                    <Link href="/register-company">
                      <Button variant="outline" size="icon" className="bg-black text-white h-8 w-8 p-0 rounded-full">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">competência</label>
                  <Select defaultValue={contractData.competencia}>
                    <SelectTrigger className="bg-gray-100">
                      <SelectValue placeholder="Selecione a competência" />
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
                  <Select defaultValue={contractData.situacao}>
                    <SelectTrigger className="bg-gray-100">
                      <SelectValue placeholder="Selecione a situação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">DATA VEN:</label>
                  <Input type="date" defaultValue={contractData.dataVen} className="bg-gray-100" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">VALOR:</label>
                  <div className="flex items-center gap-2">
                    <Input type="text" defaultValue={contractData.valor} className="bg-gray-100" />
                    <Link href="/calculate-value">
                      <Button variant="outline" size="icon" className="bg-black text-white h-8 w-8 p-0">
                        <span className="text-xs">✓</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">ANEXO:</label>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm">{contractData.anexo}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Paperclip className="h-4 w-4" />
                    Anexar arquivo
                  </Button>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <Link href="/">
                  <Button variant="outline" size="icon" className="bg-black text-white">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/contract-details/${params.id}`}>
                  <Button size="icon" className="bg-black text-white">
                    <Check className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
