"use client"

import { Church, Wine, Utensils, Heart } from "lucide-react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import type { ItineraryItem } from "@/types/sanity"

interface EventTimelineStepProps {
  event: ItineraryItem
  index: number
  isAnchor?: boolean
  isLast?: boolean
  delay?: number
}

function getIcon(order: number) {
  if (order === 1) return Church
  if (order === 2) return Wine
  if (order === 3) return Utensils
  return Heart
}

export function EventTimelineStep({
  event,
  index,
  isAnchor = false,
  isLast = false,
  delay = 0,
}: EventTimelineStepProps) {
  const { ref, isInView } = useInView()
  const isRight = index % 2 !== 0
  const Icon = getIcon(event.order)

  return (
    <li className={cn("grid grid-cols-[1fr_2rem_1fr]", !isLast && "pb-8")}>
      {/* Node: always col2, self-start so height = circle height for tick positioning */}
      <div className="col-start-2 row-start-1 self-start flex items-start justify-center relative z-10">
        {/* Tick arm toward content side */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute top-[14px] h-px w-3 bg-rose/30",
            isRight ? "left-full" : "right-full"
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            "w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0",
            isAnchor
              ? "bg-rose border-rose text-ivory"
              : "bg-ivory border-rose/60 text-rose"
          )}
        >
          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
        </div>
      </div>

      {/* Content: col1 (left, text-right) or col3 (right) */}
      <div
        ref={ref}
        style={{ animationDelay: `${delay}ms` }}
        className={cn(
          "row-start-1",
          isInView ? "animate-fade-up opacity-0" : "opacity-0",
          isRight ? "col-start-3 pl-4" : "col-start-1 pr-4 text-right"
        )}
      >
        <p
          className={cn(
            "font-sans text-[10px] tracking-widest uppercase mb-0.5",
            isAnchor ? "text-rose" : "text-taupe"
          )}
        >
          {event.time}
        </p>
        <h3
          className={cn(
            "font-serif text-base uppercase leading-tight mb-1",
            isAnchor ? "text-rose" : "text-ink"
          )}
        >
          {event.name}
        </h3>
        <p className="font-sans text-xs text-taupe leading-snug">{event.venue}</p>
        {event.notes !== undefined && (
          <p className="font-sans text-xs text-taupe italic mt-1 leading-snug">
            {event.notes}
          </p>
        )}
      </div>
    </li>
  )
}
