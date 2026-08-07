"use client"

import { EventTimelineStep } from "@/components/sections/EventTimelineStep"
import type { ItineraryItem } from "@/types/sanity"

interface EventTimelineProps {
  items: ItineraryItem[]
}

export function EventTimeline({ items }: EventTimelineProps) {
  const sorted = [...items].sort((a, b) => a.order - b.order)

  return (
    <ol className="relative">
      {sorted.map((item, index) => (
        <EventTimelineStep
          key={item._id}
          event={item}
          delay={index * 150}
          isAnchor={index === 0}
          isLast={index === sorted.length - 1}
        />
      ))}
    </ol>
  )
}
