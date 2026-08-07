"use client"

import { ReactLenis } from "lenis/react"
import type { ReactNode } from "react"

// Computed once at module load on the client (false during SSR — Lenis never runs server-side).
// Duration 0 keeps Lenis active (events, anchors) but makes scrolling instant.
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

// Nav heights: h-14 (56px) mobile, h-16 (64px) desktop.
// Negative offset pulls the scroll target up so content clears the fixed nav.
const anchorOffset =
  typeof window !== "undefined" && window.innerWidth >= 768 ? -64 : -56

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: prefersReducedMotion ? 0 : 1.2,
        anchors: { offset: anchorOffset },
      }}
    >
      {children}
    </ReactLenis>
  )
}
