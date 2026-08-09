"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import type { ItineraryItem } from "@/types/sanity"

interface EventTimelineStepProps {
  event: ItineraryItem
  delay?: number
  isAnchor?: boolean
  isLast?: boolean
}

export function EventTimelineStep({
  event,
  delay = 0,
  isAnchor = false,
  isLast = false,
}: EventTimelineStepProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 24,
        duration: 0.6,
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
    <li className={cn("relative pl-12 md:pl-14", !isLast && "pb-10")}>
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute left-[15px] md:left-[17px] top-8 bottom-0 w-px bg-gradient-to-b from-rose/50 to-rose/10"
        />
      )}

      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full border-2 shrink-0",
          isAnchor ? "bg-rose border-rose" : "bg-ivory border-rose/40"
        )}
      >
        <span
          className={cn(
            "block w-2 h-2 rounded-full",
            isAnchor ? "bg-ivory" : "bg-rose/50"
          )}
        />
      </span>

      <div ref={ref}>
        <p className="font-sans text-xs text-taupe tracking-widest uppercase mb-1">
          {event.time}
        </p>
        <h3 className="font-serif text-xl md:text-2xl text-ink mb-1">
          {event.name}
        </h3>
        <p className="font-serif text-base text-ink">{event.venue}</p>
        <p className="font-sans text-sm text-taupe mt-0.5">{event.address}</p>
        {event.notes !== undefined && (
          <p className="font-sans text-sm text-taupe italic mt-2">
            {event.notes}
          </p>
        )}
      </div>
    </li>
  )
}
