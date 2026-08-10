import Image from "next/image"
import { cn } from "@/lib/utils"

type AccentPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right"

const presetPositions: Record<AccentPosition, string> = {
  "top-left":     "absolute top-0 left-0",
  "top-right":    "absolute top-0 right-0",
  "bottom-left":  "absolute bottom-0 left-0",
  "bottom-right": "absolute bottom-0 right-0",
}

// Corner-anchored feather masks — bloom is richest at the edge, dissolves inward
const featherMasks: Record<AccentPosition, string> = {
  "top-left":     "radial-gradient(ellipse 85% 85% at top left,    white 30%, transparent 75%)",
  "top-right":    "radial-gradient(ellipse 85% 85% at top right,   white 30%, transparent 75%)",
  "bottom-left":  "radial-gradient(ellipse 85% 85% at bottom left,  white 30%, transparent 75%)",
  "bottom-right": "radial-gradient(ellipse 85% 85% at bottom right, white 30%, transparent 75%)",
}

interface FloralAccentProps {
  src: string
  width: number
  height: number
  position?: AccentPosition
  className?: string   // required when position is omitted — must include absolute + coords
  rotation?: number    // degrees — inline style (dynamic runtime value)
  opacity?: number     // 0–1  — inline style (dynamic runtime value)
  feather?: boolean    // apply corner-anchored radial feather mask (requires position)
  priority?: boolean   // true only for above-fold placement
  sizes?: string       // responsive sizes hint for next/image srcset selection
}

export function FloralAccent({
  src,
  width,
  height,
  position,
  className,
  rotation,
  opacity,
  feather = false,
  priority = false,
  sizes,
}: FloralAccentProps) {
  if (!src) return null

  const mask = feather && position ? featherMasks[position] : undefined

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none select-none",
        position ? presetPositions[position] : "absolute",
        className,
      )}
      style={{
        transform: rotation !== undefined ? `rotate(${rotation}deg)` : undefined,
        opacity,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        className="w-full h-auto"
        sizes={sizes ?? `${width}px`}
        priority={priority}
      />
    </div>
  )
}
