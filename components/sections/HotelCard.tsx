"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { ExternalLink, MapPin } from "lucide-react"
import type { Hotel } from "@/types/sanity"

interface HotelCardProps {
  hotel: Hotel
  delay?: number
}

export function HotelCard({ hotel, delay = 0 }: HotelCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 28,
        duration: 0.65,
        delay: delay / 1000,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      })
    })
  }, { scope: ref, dependencies: [delay] })

  return (
    <div
      ref={ref}
      className="flex flex-col rounded-card bg-ivory p-6 md:p-8"
    >
      <p className="flex items-center gap-1 font-sans text-xs text-taupe tracking-widest uppercase mb-3">
        <MapPin size={11} aria-hidden="true" className="shrink-0" />
        {hotel.distance}
      </p>
      <h3 className="font-serif text-xl md:text-2xl text-ink mb-2">
        {hotel.name}
      </h3>
      <p className="font-serif text-base text-ink">
        {hotel.rate}
      </p>
      {hotel.notes !== undefined && (
        <p className="font-sans text-sm text-taupe italic mt-3">
          {hotel.notes}
        </p>
      )}
      <a
        href={hotel.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Book ${hotel.name}`}
        className="mt-auto inline-flex items-center gap-1.5 pt-6 min-h-[44px] font-sans text-sm text-rose hover:text-rose-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 rounded-sm"
      >
        Book now
        <ExternalLink size={14} aria-hidden="true" />
      </a>
    </div>
  )
}
