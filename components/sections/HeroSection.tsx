import Image from "next/image"
import dynamic from "next/dynamic"
import { ChevronDown } from "lucide-react"
import { HeroVideo } from "@/components/sections/HeroVideo"
import { HeroReveal } from "@/components/sections/HeroReveal"
import type { CoupleInfo } from "@/types/sanity"

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

      {/* Gradient over background; particles layer above it, content z-10 above both */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/65 pointer-events-none"
      />

      <HeroParticles />

      <div className="relative z-10">
        <HeroReveal couple={couple} />
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
