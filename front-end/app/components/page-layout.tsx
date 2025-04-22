"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Header from "./header"
import Footer from "./footer"
import Logo from "./logo"

interface PageLayoutProps {
  children: React.ReactNode
  title?: string
}

export default function PageLayout({ children, title }: PageLayoutProps) {
  const [logoInHeader, setLogoInHeader] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (logoRef.current) {
        const logoPosition = logoRef.current.getBoundingClientRect().top
        // If logo is scrolled above the viewport, show it in header
        setLogoInHeader(logoPosition < 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header showLogo={logoInHeader} />

      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div ref={logoRef} className="mb-6 text-center">
            <Logo />
          </div>

          {title && (
            <div className="max-w-3xl mx-auto mb-6">
              <h2 className="text-2xl font-bold">{title}</h2>
            </div>
          )}

          {children}
        </div>
      </div>

      <Footer />
    </main>
  )
}
