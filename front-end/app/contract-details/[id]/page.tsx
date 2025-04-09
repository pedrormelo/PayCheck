import { Button } from "@/components/ui/button"
import { Trash2, Download, Upload, Edit, Clock, DollarSign } from "lucide-react"
import Link from "next/link"
import Header from "@/app/components/header"
import Footer from "@/app/components/footer"

export default function ContractDetails({ params }: { params: { id: string } }) {
  // Sample contract data
  const contract = {
    id: params.id,
    competencia: "MARÇO/2025",
    dataVen: "10/03/2025",
    dataRen: "10/03/2026",
    empresa: "EMPRESA PADRÃO",
    valor: "R$ 65.000,00",
    status: "ATIVO",
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

          <div className="bg-gray-200 rounded-md p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm font-medium mb-1">ID:</div>
                <div className="bg-white p-2 rounded">{contract.id}</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">DATA VEN:</div>
                <div className="bg-white p-2 rounded">{contract.dataVen}</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">COMPETÊNCIA:</div>
                <div className="bg-white p-2 rounded">{contract.competencia}</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">DATA REN (PREVISTO):</div>
                <div className="bg-white p-2 rounded">{contract.dataRen}</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">EMPRESA:</div>
                <div className="bg-white p-2 rounded">{contract.empresa}</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">VALOR:</div>
                <div className="bg-white p-2 rounded">{contract.valor}</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">STATUS:</div>
                <div className="flex items-center gap-2">
                  <div className="bg-white p-2 rounded flex-grow">{contract.status}</div>
                  <Button variant="outline" size="sm" className="bg-black text-white h-8 w-8 p-0 rounded-full">
                    <span className="text-xs">✓</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Anexo section */}
            <div className="mt-4">
              <div className="text-sm font-medium mb-1">ANEXO:</div>
              <div className="flex items-center gap-2">
                <div className="bg-white p-2 rounded flex-grow">{contract.anexo}</div>
                <Button variant="outline" size="sm" className="bg-black text-white h-8 w-8 p-0 rounded-full">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-black text-white h-8 w-8 p-0 rounded-full">
                  <Upload className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-black text-white h-8 w-8 p-0 rounded-full">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {/* Delete button */}
              <Link href="/">
                <Button variant="outline" size="icon" className="bg-black text-white rounded-full h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </Link>

              {/* Payment register button (cash register) */}
              <Link href={`/payment-register/${params.id}`}>
                <Button variant="outline" size="icon" className="bg-black text-white rounded-full h-8 w-8">
                  <DollarSign className="h-4 w-4" />
                </Button>
              </Link>

              {/* History button (clock) */}
              <Link href={`/payment-history/${params.id}`}>
                <Button variant="outline" size="icon" className="bg-black text-white rounded-full h-8 w-8">
                  <Clock className="h-4 w-4" />
                </Button>
              </Link>

              {/* Edit button (pencil) */}
              <Link href={`/edit-contract/${params.id}`}>
                <Button variant="outline" size="icon" className="bg-black text-white rounded-full h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
