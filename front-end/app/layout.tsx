import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Paycheck',
  description: 'help of v0 ai',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="br">
      <body>{children}</body>
    </html>
  )
}
