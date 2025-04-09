import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-black text-white py-3 border-b border-gray-700">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="flex items-center gap-8">
          <Link href="https://STOCK.LINK" className="text-sm text-gray-300 hover:text-white transition-colors">
            STOCK
          </Link>
          <Link href="https://sysTAB.LINK" className="text-sm text-gray-300 hover:text-white transition-colors">
            SysTab
          </Link>
        </div>
      </div>
    </header>
  )
}
