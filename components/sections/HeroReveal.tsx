"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, SplitText } from "@/lib/gsap"
import { CountdownTimer } from "@/components/sections/CountdownTimer"
import type { CoupleInfo } from "@/types/sanity"

interface HeroRevealProps {
  couple: CoupleInfo
}

function formatDate(iso: string): string {
  const parts = iso.split("-")
  const year = Number(parts[0])
  const month = Number(parts[1])
  const day = Number(parts[2])
  if (!year || !month || !day) return iso
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function HeroReveal({ couple }: HeroRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const eyebrowRef   = useRef<HTMLParagraphElement>(null)
  const headingRef   = useRef<HTMLHeadingElement>(null)
  const dividerRef   = useRef<HTMLDivElement>(null)
  const dateRef      = useRef<HTMLParagraphElement>(null)
  const locationRef  = useRef<HTMLParagraphElement>(null)
  const bioRef       = useRef<HTMLParagraphElement>(null)
  const countdownRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const eyebrowSplit = new SplitText(eyebrowRef.current, { type: "words" })
      const headingSplit = new SplitText(headingRef.current, { type: "chars" })

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // Eyebrow words drift up first — sets the stage before the names arrive
      tl.from(eyebrowSplit.words, {
        opacity: 0,
        y: 14,
        duration: 0.55,
        stagger: 0.07,
      })
      // Names arrive character-by-character with deliberate pacing
      .from(headingSplit.chars, {
        opacity: 0,
        y: 52,
        duration: 0.75,
        stagger: 0.028,
      }, "-=0.15")
      // Supporting details assemble below
      .from(dividerRef.current, { opacity: 0, duration: 0.4 }, "-=0.2")
      .from([dateRef.current, locationRef.current], {
        opacity: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.13,
      }, "-=0.1")
      .from(bioRef.current ?? [], { opacity: 0, y: 8, duration: 0.5 }, "-=0.1")
      .from(countdownRef.current, { opacity: 0, y: 16, duration: 0.5 }, "-=0.15")

      return () => {
        eyebrowSplit.revert()
        headingSplit.revert()
      }
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="flex flex-col items-center text-center max-w-xl mx-auto">
      <p
        ref={eyebrowRef}
        className="font-sans text-xs text-blush tracking-widest uppercase mb-4"
      >
        You are cordially invited
      </p>

      <h1
        ref={headingRef}
        className="font-script text-6xl md:text-7xl lg:text-8xl text-ivory leading-none"
      >
        {couple.names}
      </h1>

      <div ref={dividerRef} className="w-16 h-px bg-white/25 my-6 md:my-8" aria-hidden="true" />

      <p ref={dateRef} className="font-serif text-xl md:text-2xl text-ivory">
        {formatDate(couple.weddingDate)}
      </p>
      <p ref={locationRef} className="font-serif text-base md:text-lg text-blush italic mt-2">
        {couple.locationName}
      </p>

      {couple.bio && (
        <p
          ref={bioRef}
          className="font-serif text-sm md:text-base text-blush italic mt-5 max-w-sm leading-relaxed"
        >
          {couple.bio}
        </p>
      )}

      <div ref={countdownRef}>
        <CountdownTimer weddingDate={couple.weddingDate} />
      </div>
    </div>
  )
}
