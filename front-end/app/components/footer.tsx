import QRCode from "./qr-code"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-3 border-t border-gray-700 relative">
      <div className="container mx-auto px-4 text-center text-xs text-gray-400">
        Gerenciador de Contratos do GTI da Sec. de Saúde - Jaboatão dos Guararapes - Maio de 2025 - Ver: 7.0.0
      </div>
      <div className="absolute bottom-2 right-4">
        <QRCode />
      </div>
    </footer>
  )
}
