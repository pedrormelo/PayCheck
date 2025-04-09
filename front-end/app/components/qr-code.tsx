import Image from "next/image"

export default function QRCode() {
  return (
    <div className="h-16 w-16 bg-white border rounded-md flex items-center justify-center">
      <div className="h-14 w-14 relative">
        <Image src="/placeholder.svg?height=56&width=56" alt="QR Code" fill className="object-contain" />
      </div>
    </div>
  )
}
