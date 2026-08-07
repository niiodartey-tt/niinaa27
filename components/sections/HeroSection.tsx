import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { HeroVideo } from "@/components/sections/HeroVideo"
import { CountdownTimer } from "@/components/sections/CountdownTimer"
import type { CoupleInfo } from "@/types/sanity"

interface HeroSectionProps {
  couple: CoupleInfo
  videoSrc?: string
  posterSrc?: string
  heroImageSrc?: string
}

// Local-time constructor avoids UTC-midnight shift in negative-offset timezones.
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

export function HeroSection({ couple, videoSrc, posterSrc, heroImageSrc }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-ink px-4 py-20"
    >
      {videoSrc && <HeroVideo src={videoSrc} poster={posterSrc} />}
      {!videoSrc && heroImageSrc && (
        <Image
          src={heroImageSrc}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-[75%_50%] md:object-center"
          priority
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/65 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto animate-fade-up">
        <p className="font-sans text-xs text-blush tracking-widest uppercase mb-4">
          You are cordially invited
        </p>
        <h1 className="font-script text-6xl md:text-7xl lg:text-8xl text-ivory leading-none">
          {couple.names}
        </h1>

        <div className="w-16 h-px bg-white/25 my-6 md:my-8" aria-hidden="true" />

        <p className="font-serif text-xl md:text-2xl text-ivory">
          {formatDate(couple.weddingDate)}
        </p>
        <p className="font-serif text-base md:text-lg text-blush italic mt-2">
          {couple.locationName}
        </p>

        {couple.bio && (
          <p className="font-serif text-sm md:text-base text-blush italic mt-5 max-w-sm leading-relaxed">
            {couple.bio}
          </p>
        )}

        <CountdownTimer weddingDate={couple.weddingDate} />
      </div>

      <a
        href="#our-story"
        aria-label="Scroll to Our Story"
        className="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-1 text-blush hover:text-ivory transition-colors duration-300 min-h-[44px] justify-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 rounded-sm"
      >
        <span className="font-sans text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
