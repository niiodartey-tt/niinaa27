"use client"

import { ReactLenis, useLenis } from "lenis/react"
import type { ReactNode } from "react"
import { ScrollTrigger } from "@/lib/gsap"

// Keeps ScrollTrigger in sync with Lenis's per-frame scroll position updates.
// Must be rendered inside the ReactLenis tree to access the lenis instance.
function ScrollTriggerSyncer() {
  useLenis(() => ScrollTrigger.update())
  return null
}

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

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
      <ScrollTriggerSyncer />
      {children}
    </ReactLenis>
  )
}
