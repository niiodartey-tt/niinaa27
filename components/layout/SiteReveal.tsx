"use client"

import { useState } from "react"

export function SiteReveal() {
  const [gone, setGone] = useState(false)

  if (gone) return null

  return (
    <div
      aria-hidden="true"
      onAnimationEnd={() => setGone(true)}
      className="fixed inset-0 z-[200] bg-ink pointer-events-none select-none animate-curtain-out motion-reduce:hidden"
    />
  )
}
