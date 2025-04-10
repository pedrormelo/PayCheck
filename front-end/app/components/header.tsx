import Link from "next/link"
import { NotificationBell } from "@/components/notification-bell"

export default function Header() {
  return (
    <header className="bg-black text-white py-3 border-b border-gray-700">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left spacer to help with centering */}
        <div className="w-10"></div>

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
