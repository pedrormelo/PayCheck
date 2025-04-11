import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { FloatingNotification } from "@/components/floating-notification"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PayCheck!",
  description: "Gerenciador de Contratos",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <Toaster />
        <FloatingNotification />
      </body>
    </html>
  )
}


import './globals.css'