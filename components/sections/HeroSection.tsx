import Image from "next/image"
import dynamic from "next/dynamic"
import { ChevronDown } from "lucide-react"
import { HeroVideo } from "@/components/sections/HeroVideo"
import { CountdownTimer } from "@/components/sections/CountdownTimer"
import type { CoupleInfo } from "@/types/sanity"

// ── Non-negotiable 3: lazy-loaded — Three.js must not add to First Load JS ──
const HeroParticles = dynamic(
  () => import("@/components/sections/HeroParticles"),
  { ssr: false }
)

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
        className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/18 pointer-events-none"
      />

      {/* Particles above gradient, below z-10 text — pointer-events-none on canvas */}
      <HeroParticles />

      {/* White glow on container: edge definition for dark ink text against bright petals.
          h1 names override this with their own strong dark shadow (CSS specificity). */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto animate-fade-up [text-shadow:_0_0_8px_rgba(255,255,255,0.7)]">
        <p className="font-sans text-xs text-ink tracking-widest uppercase mb-4">
          You are cordially invited to the wedding of
        </p>

        {/* Names stay ivory with their own dark shadow — confirmed legible */}
        <h1 className="font-script text-6xl md:text-7xl lg:text-8xl text-ivory leading-none [text-shadow:_0_2px_8px_rgba(0,0,0,0.9),_0_4px_16px_rgba(0,0,0,0.6)]">
          {couple.names}
        </h1>

        <div className="w-16 h-px bg-ink/30 my-6 md:my-8" aria-hidden="true" />

        <p className="font-serif text-sm italic text-ink/70 leading-relaxed max-w-xs mx-auto mb-6 md:mb-8">
          &ldquo;Wherefore they are no more twain, but one flesh. What therefore God hath joined together, let not man put asunder.&rdquo;
          <span className="block mt-1 not-italic text-xs text-ink/50 tracking-wide">— Matthew 19:6</span>
        </p>

        <p className="font-serif text-xl md:text-2xl text-ink">
          {formatDate(couple.weddingDate)}
        </p>
        <p className="font-serif text-base md:text-lg text-ink italic mt-2">
          {couple.locationName}
        </p>

        {couple.bio && (
          <p className="font-serif text-sm md:text-base text-ink italic mt-5 max-w-sm leading-relaxed">
            {couple.bio}
          </p>
        )}

        <CountdownTimer weddingDate={couple.weddingDate} />

        <a
          href="#rsvp"
          className="mt-8 inline-flex items-center rounded-full border border-gold-base bg-transparent hover:bg-gold-base/20 text-ivory font-sans text-sm tracking-widest uppercase px-8 py-3 min-h-[44px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-base focus-visible:ring-offset-2 focus-visible:ring-offset-ink [text-shadow:_0_2px_8px_rgba(0,0,0,0.9),_0_4px_16px_rgba(0,0,0,0.6)]"
        >
          Kindly RSVP
        </a>
      </div>

      <a
        href="#our-story"
        aria-label="Scroll to Our Story"
        className="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-1 text-ivory hover:text-gold-highlight transition-colors duration-300 min-h-[44px] justify-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-base focus-visible:ring-offset-2 rounded-sm"
      >
        <span className="font-sans text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
