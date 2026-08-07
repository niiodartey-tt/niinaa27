import { ChevronDown } from "lucide-react"
import { FloralArch } from "@/components/illustrations/FloralArch"
import { CountdownTimer } from "@/components/sections/CountdownTimer"
import type { CoupleInfo } from "@/types/sanity"

interface HeroSectionProps {
  couple: CoupleInfo
}

// Use local-time Date constructor (not ISO string) to avoid UTC-midnight
// shifting the date back one day in negative-offset timezones.
function formatDate(iso: string): string {
  const parts = iso.split("-")
  const year = Number(parts[0])
  const month = Number(parts[1])
  const day = Number(parts[2])
  if (!year || !month || !day) return iso
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function HeroSection({ couple }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-ivory px-4 py-16"
    >
      <div className="flex flex-col items-center text-center max-w-xl mx-auto animate-fade-up">
        <FloralArch
          aria-hidden="true"
          className="w-full max-w-[280px] md:max-w-xs text-rose/70 mb-6 md:mb-8"
        />

        <h1 className="font-script text-6xl md:text-7xl lg:text-8xl text-ink leading-none">
          {couple.names}
        </h1>

        <div className="w-16 h-px bg-hairline my-6 md:my-8" aria-hidden="true" />

        <p className="font-serif text-xl md:text-2xl text-ink">
          {formatDate(couple.weddingDate)}
        </p>
        <p className="font-serif text-base md:text-lg text-taupe italic mt-2">
          {couple.locationName}
        </p>
        <CountdownTimer weddingDate={couple.weddingDate} />
      </div>

      <a
        href="#our-story"
        aria-label="Scroll to Our Story"
        className="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-1 text-taupe hover:text-rose transition-colors duration-300 min-h-[44px] justify-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 rounded-sm"
      >
        <span className="font-sans text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
