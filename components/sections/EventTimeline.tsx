"use client"

import { EventTimelineStep } from "@/components/sections/EventTimelineStep"
import type { ItineraryItem } from "@/types/sanity"

interface EventTimelineProps {
  items: ItineraryItem[]
}

export function EventTimeline({ items }: EventTimelineProps) {
  const sorted = [...items].sort((a, b) => a.order - b.order)

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-rose/30"
      />
      <ol>
        {sorted.map((item, index) => (
          <EventTimelineStep
            key={item._id}
            event={item}
            index={index}
            isAnchor={index === 0}
            isLast={index === sorted.length - 1}
            delay={index * 150}
          />
        ))}
      </ol>
    </div>
  )
}
