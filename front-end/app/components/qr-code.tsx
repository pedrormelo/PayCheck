import Image from "next/image"

export default function QRCode() {
  return (
    <div className="h-28 w-28 bg-white border rounded-md flex items-center justify-center">
      <div className="h-28 w-28 relative">
        <Image src="/placeholder.svg" alt="QR Code" fill className="object-contain" />
      </div>
    </div>
  )
}