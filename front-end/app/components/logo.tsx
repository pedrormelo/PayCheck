"use client"

import Link from "next/link"

interface LogoProps {
  className?: string
  inverted?: boolean
}

export default function Logo({ className = "", inverted = false }: LogoProps) {
  return (
    <Link href="/" className={`inline-block ${className}`}>
      <h1 className="text-4xl font-bold cursor-pointer transition-transform hover:scale-105">
        <span className={inverted ? "text-white" : "text-black"}>Pay</span>
        <span className="text-orange-500">Check!</span>
      </h1>
    </Link>
  )
}
