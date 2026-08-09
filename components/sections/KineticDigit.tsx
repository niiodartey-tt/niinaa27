"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"

interface KineticDigitProps {
  value: string
  label: string
}

export function KineticDigit({ value, label }: KineticDigitProps) {
  const spanRef = useRef<HTMLSpanElement>(null)

  // Re-runs whenever value changes — GSAP from-state creates the slide-in effect
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(spanRef.current, {
        y: 14,
        opacity: 0,
        duration: 0.28,
        ease: "power2.out",
      })
    })
  }, { scope: spanRef, dependencies: [value] })

  return (
    <div className="flex flex-col items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-3 md:px-4 min-w-[60px] md:min-w-[68px]">
      <span
        ref={spanRef}
        className="font-serif text-2xl md:text-3xl text-ivory tabular-nums leading-none"
      >
        {value}
      </span>
      <span className="font-sans text-[10px] text-blush tracking-widest uppercase">
        {label}
      </span>
    </div>
  )
}
