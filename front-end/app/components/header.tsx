import Link from "next/link"
import { NotificationBell } from "@/components/notification-bell"
import { BarChart3 } from "lucide-react"
import Logo from "./logo"

interface HeaderProps {
  showLogo?: boolean
}

export default function Header({ showLogo = false }: HeaderProps) {
  return (
    <header className="bg-black text-white py-3 border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left dashboard link */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
            <BarChart3 className="h-5 w-5" />
          </Link>

          {showLogo && <Logo inverted={true} className="text-2xl" />}
        </div>

        {/* Center navigation */}
        <div className="flex items-center gap-8">
          <Link href="http://10.87.20.2:3300/home" className="text-sm text-gray-400 hover:text-white transition-colors">
            STOCK
          </Link>
          <Link href="https://systab.example.com" className="text-sm text-gray-400 hover:text-white transition-colors">
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
