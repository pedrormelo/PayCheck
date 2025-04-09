import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Plus } from "lucide-react"
import Link from "next/link"
import Header from "@/app/components/header"
import Footer from "@/app/components/footer"

export default function RegisterCompany() {
  // Sample data for existing companies
  const companies = ["EMPRESA 1", "EMPRESA 2", "EMPRESA 3"]

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
            <h2 className="text-2xl font-bold mb-6">Cadastrar Empresa</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">NOME DA EMPRESA</label>
                <Input placeholder="Digite o nome da empresa" className="bg-gray-100" />
              </div>

              <div>
                <h2 className="text-lg font-medium mb-2">EMPRESAS</h2>
                <div className="space-y-2 border rounded-md p-4 bg-gray-100">
                  {companies.map((company, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-md">
                      <span>{company}</span>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Plus className="h-4 w-4 rotate-45" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Link href="/register-contract">
                  <Button size="icon" className="bg-black text-white rounded-full h-8 w-8">
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
