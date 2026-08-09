"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FaqItem } from "@/types/sanity"

interface FAQAccordionProps {
  items: FaqItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(containerRef.current?.querySelectorAll("article") ?? [], {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.09,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
    })
  }, { scope: containerRef })

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <div ref={containerRef} className="border-t border-hairline divide-y divide-hairline">
      {items.map((item, i) => {
        const open = openIndex === i
        return (
          <article key={item._id}>
            <h3>
              <button
                id={`faq-trigger-${item._id}`}
                type="button"
                aria-expanded={open}
                aria-controls={`faq-panel-${item._id}`}
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2"
              >
                <span className="font-serif text-lg md:text-xl text-ink leading-snug">
                  {item.question}
                </span>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 text-taupe transition-transform duration-200",
                    open && "rotate-180"
                  )}
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${item._id}`}
              role="region"
              aria-labelledby={`faq-trigger-${item._id}`}
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <p className="font-serif text-base text-taupe pb-5 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
