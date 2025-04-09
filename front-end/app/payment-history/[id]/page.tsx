import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"
import Link from "next/link"
import Header from "@/app/components/header"
import Footer from "@/app/components/footer"
import Logo from "@/app/components/logo"

export default function PaymentRegister({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="mb-6 text-center">
            <Logo />
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 border">
            <h2 className="text-2xl font-bold mb-6">Registrar Pagamento - Contrato {params.id}</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">DATA DO PAGAMENTO</label>
                  <Input type="date" className="bg-gray-100" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">VALOR</label>
                  <Input type="text" placeholder="R$ 0,00" className="bg-gray-100" />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">OBSERVAÇÕES</label>
                  <Input className="bg-gray-100" />
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Link href={`/contract-details/${params.id}`}>
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
