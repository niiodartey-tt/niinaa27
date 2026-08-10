import Image from "next/image"
import { cn } from "@/lib/utils"

interface MonogramProps {
  alt: string
  className?: string
  sizes?: string
}

export function Monogram({
  alt,
  className,
  sizes = "(min-width: 768px) 208px, 160px",
}: MonogramProps) {
  return (
    <Image
      src="/logo-tl.png"
      alt={alt}
      width={800}
      height={800}
      className={cn("h-auto", className)}
      sizes={sizes}
    />
  )
}
