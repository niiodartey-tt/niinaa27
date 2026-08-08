import Image from "next/image"
import { cn } from "@/lib/utils"

type AccentPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right"

const presetPositions: Record<AccentPosition, string> = {
  "top-left":     "absolute top-0 left-0",
  "top-right":    "absolute top-0 right-0",
  "bottom-left":  "absolute bottom-0 left-0",
  "bottom-right": "absolute bottom-0 right-0",
}

interface FloralAccentProps {
  src: string
  width: number
  height: number
  position?: AccentPosition
  className?: string   // required when position is omitted — must include absolute + coords
  rotation?: number    // degrees — inline style (dynamic runtime value)
  opacity?: number     // 0–1  — inline style (dynamic runtime value)
  priority?: boolean   // true only for above-fold placement
}

export function FloralAccent({
  src,
  width,
  height,
  position,
  className,
  rotation,
  opacity,
  priority = false,
}: FloralAccentProps) {
  if (!src) return null

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
      }}
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        sizes={`${width}px`}
        priority={priority}
      />
    </div>
  )
}
