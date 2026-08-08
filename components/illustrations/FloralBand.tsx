import Image from "next/image"
import { cn } from "@/lib/utils"

interface FloralBandImage {
  id: string     // stable React key — use a descriptive slug, not array index
  src: string    // empty string = placeholder (image not yet sourced)
  width: number  // rendered px width
  height: number // rendered px height
}

interface FloralBandProps {
  images: FloralBandImage[]
  topColor: string    // hex — matches adjacent section background above
  bottomColor: string // hex — matches adjacent section background below
  className?: string
}

export function FloralBand({ images, topColor, bottomColor, className }: FloralBandProps) {
  const filledImages = images.filter((img) => img.src)

  // No assets yet — hairline gradient preserves the color transition in placeholder state
  if (filledImages.length === 0) {
    return (
      <div
        aria-hidden="true"
        className="h-1"
        style={{ background: `linear-gradient(to bottom, ${topColor}, ${bottomColor})` }}
      />
    )
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-end justify-center gap-4 md:gap-6 px-4 py-10 md:py-14 overflow-hidden",
        className,
      )}
      style={{ background: `linear-gradient(to bottom, ${topColor}, ${bottomColor})` }}
    >
      {filledImages.map((img) => (
        <Image
          key={img.id}
          src={img.src}
          alt=""
          width={img.width}
          height={img.height}
          sizes={`${img.width}px`}
        />
      ))}
    </div>
  )
}
