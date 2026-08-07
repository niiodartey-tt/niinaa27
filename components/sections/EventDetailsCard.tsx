"use client"

import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import type { ItineraryItem } from "@/types/sanity"

interface EventDetailsCardProps {
  event: ItineraryItem
  delay?: number
}

// Pattern 4 reference component: scroll reveal + aria-hidden SVG inside the same
// animated wrapper. See .claude/standards/04-animation.md for the full explanation
// of why aria-hidden and opacity:0 are independent axes.
export function EventDetailsCard({ event, delay = 0 }: EventDetailsCardProps) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        "relative rounded-card bg-blush p-8",
        isInView ? "animate-fade-up opacity-0" : "opacity-0"
      )}
    >
      {/* Decorative leaf accent — aria-hidden keeps it out of the accessibility
          tree at all times, regardless of parent opacity or animation state */}
      <span
        aria-hidden="true"
        className="absolute top-4 right-4 text-rose/30 select-none pointer-events-none font-script text-4xl leading-none"
      >
        ✦
      </span>

      <p className="font-sans text-xs text-taupe tracking-widest uppercase mb-2">
        {event.time}
      </p>
      <h3 className="font-serif text-2xl text-ink mb-1">{event.name}</h3>
      <p className="font-serif text-base text-ink">{event.venue}</p>
      <p className="font-sans text-sm text-taupe mt-1">{event.address}</p>
      {event.notes !== undefined && (
        <p className="font-sans text-sm text-taupe mt-3 italic">{event.notes}</p>
      )}
    </div>
  )
}
