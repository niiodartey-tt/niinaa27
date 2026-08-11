"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Monogram } from "@/components/illustrations/Monogram"

const links = [
  { label: "Our Story", href: "#our-story" },
  { label: "Event", href: "#event-details" },
  { label: "Travel", href: "#travel-stay" },
  { label: "RSVP", href: "#rsvp" },
  { label: "Gift Guide", href: "#gift-guide" },
  { label: "FAQ", href: "#faq" },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-[#FDFCF9]/90 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8 flex items-center justify-between h-14 md:h-16">
        <a
          href="#hero"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-base rounded-sm"
        >
          <Monogram alt="" className="w-14 md:w-16" sizes="(min-width: 768px) 64px, 56px" />
          <span className="sr-only">Thomas and Leanne — Home</span>
        </a>

        <nav aria-label="Site navigation" className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-xs tracking-widest uppercase text-ink hover:underline hover:decoration-gold-base underline-offset-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-base rounded-sm min-h-[44px] inline-flex items-center"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-base rounded-sm"
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="md:hidden bg-[#FDFCF9]/95 backdrop-blur-md border-t border-gold-base/20 px-4 py-4"
        >
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block font-sans text-sm tracking-widest uppercase text-ink hover:underline hover:decoration-gold-base underline-offset-2 transition-all duration-200 py-3 min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-base rounded-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
