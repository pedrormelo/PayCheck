import Image from "next/image"

export default function QRCode() {
  return (
    <div className="h-24 w-24 bg-white border rounded-md flex items-center justify-center">
      <div className="h-20 w-20 relative">
        <Image src="/placeholder.svg" alt="QR Code" fill className="object-contain" />
      </div>
    </div>
  )
}
