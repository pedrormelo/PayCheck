import Link from "next/link"
import { NotificationBell } from "@/components/notification-bell"
import { BarChart3 } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-black text-white py-3 border-b border-gray-700">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left dashboard link */}
        <div>
          <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
            <BarChart3 className="h-5 w-5" />
          </Link>
        </div>

        {/* Center navigation */}
        <div className="flex items-center gap-8">
          <Link href="https://stock.example.com" className="text-sm text-gray-300 hover:text-white transition-colors">
            STOCK
          </Link>
          <Link href="https://systab.example.com" className="text-sm text-gray-300 hover:text-white transition-colors">
            SysTab
          </Link>
        </div>

        {/* Right notification bell */}
        <div>
          <NotificationBell />
        </div>
      </div>
    </header>
  )
}
