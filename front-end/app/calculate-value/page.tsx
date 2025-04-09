import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"
import Header from "@/app/components/header"
import Footer from "@/app/components/footer"
import Logo from "@/app/components/logo"

export default function CalculateValue() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="mb-6 text-center">
            <Logo />
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-200 rounded-md p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-full max-w-md">
                  <Input
                    type="text"
                    value="1000 x 65"
                    className="text-center bg-blue-500 text-white text-xl py-2 px-4 rounded-md"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white">
                      <span className="text-xs">C</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white">
                      <span className="text-xs">⌫</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <Button size="icon" className="bg-black text-white rounded-full h-8 w-8">
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
