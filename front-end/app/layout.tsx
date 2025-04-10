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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
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
