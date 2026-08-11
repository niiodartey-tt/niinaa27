"use client"

import { ExternalLink, MapPin } from "lucide-react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import type { Hotel } from "@/types/sanity"

interface HotelCardProps {
  hotel: Hotel
  delay?: number
}

export function HotelCard({ hotel, delay = 0 }: HotelCardProps) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        "flex flex-col rounded-card bg-gold-highlight/15 p-6 md:p-8",
        isInView ? "animate-fade-up opacity-0" : "opacity-0"
      )}
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
        className="mt-auto inline-flex items-center gap-1.5 pt-6 min-h-[44px] font-sans text-sm text-ink hover:opacity-70 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-base focus-visible:ring-offset-2 rounded-sm"
      >
        Book now
        <ExternalLink size={14} aria-hidden="true" />
      </a>
    </div>
  )
}
