"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { StoryCardHorizontal } from "@/components/sections/StoryCardHorizontal"
import type { StoryMilestone } from "@/types/sanity"

interface OurStoryHorizontalProps {
  milestones: StoryMilestone[]
}

export function OurStoryHorizontal({ milestones }: OurStoryHorizontalProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stripRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const strip = stripRef.current
    if (!strip) return

    const mm = gsap.matchMedia()

    // Desktop: pin the section and scrub-translate the strip leftward
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(strip, {
        x: () => -(strip.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${strip.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="our-story"
      className="bg-blush md:min-h-screen md:flex md:flex-col"
    >
      {/* Heading — flex-none keeps it out of the strip's grow area */}
      <div className="flex-none text-center px-4 pt-16 pb-10 md:pt-20 md:pb-6">
        <p className="font-sans text-xs text-taupe tracking-widest uppercase mb-3">
          How it began
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-ink">Our Story</h2>
      </div>

      {/* Desktop: flex-1 container clips the wider-than-viewport strip */}
      <div className="hidden md:flex flex-1 items-center overflow-hidden">
        <div
          ref={stripRef}
          className="flex flex-row items-center gap-8 px-16 will-change-transform"
          style={{ width: "max-content" }}
        >
          {milestones.map((m, i) => (
            <StoryCardHorizontal
              key={m._id}
              milestone={m}
              isLast={i === milestones.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Mobile: vertical stack, no animation (G5 adds scroll reveals) */}
      <ol className="flex md:hidden flex-col gap-5 px-4 pb-16">
        {milestones.map((m, i) => {
          const isLast = i === milestones.length - 1
          return (
            <li
              key={m._id}
              className={cn(
                "rounded-3xl border p-5",
                isLast ? "bg-rose border-rose" : "bg-ivory border-hairline"
              )}
            >
              <p className={cn("font-sans text-xs tracking-widest uppercase mb-1", isLast ? "text-ivory/70" : "text-taupe")}>
                {m.date}
              </p>
              <h3 className={cn("font-serif text-xl mb-2", isLast ? "text-ivory" : "text-ink")}>
                {m.title}
              </h3>
              <p className={cn("font-serif text-sm leading-relaxed", isLast ? "text-ivory/80" : "text-taupe")}>
                {m.description}
              </p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
