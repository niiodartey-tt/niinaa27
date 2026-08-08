import { HeroSection } from "@/components/sections/HeroSection"
import { OurStorySection } from "@/components/sections/OurStorySection"
import { EventDetailsSection } from "@/components/sections/EventDetailsSection"
import { TravelStaySection } from "@/components/sections/TravelStaySection"
import { RSVPSection } from "@/components/sections/RSVPSection"
import { RegistrySection } from "@/components/sections/RegistrySection"
import { FAQSection } from "@/components/sections/FAQSection"
import { FooterSection } from "@/components/sections/FooterSection"
import { TornEdgeDivider } from "@/components/illustrations/TornEdgeDivider"
import { FloralBand } from "@/components/illustrations/FloralBand"
import {
  placeholderCoupleInfo,
  placeholderMilestones,
  placeholderItinerary,
  placeholderHotels,
  placeholderFaqItems,
  placeholderRegistry,
} from "@/lib/placeholder-data"

// Design token hex values — must stay in sync with tailwind.config.ts
const ivory = "#FBF9F4"
const blush = "#F0DCD0"
const ink   = "#3A2A22"

// Floral band placeholders — replace src values once assets are sourced
// Band 1: Our Story → Event Details transition
const ourStoryBand = [
  { id: "os-1", src: "", width: 240, height: 300 },
  { id: "os-2", src: "", width: 240, height: 300 },
  { id: "os-3", src: "", width: 240, height: 300 },
  { id: "os-4", src: "", width: 240, height: 300 },
]
// Band 2: Travel & Stay → RSVP transition
const travelRsvpBand = [
  { id: "tr-1", src: "", width: 240, height: 300 },
  { id: "tr-2", src: "", width: 240, height: 300 },
  { id: "tr-3", src: "", width: 240, height: 300 },
  { id: "tr-4", src: "", width: 240, height: 300 },
]

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <HeroSection
          couple={placeholderCoupleInfo}
          heroImageSrc="/hero-bg.jpg"
        />
        <TornEdgeDivider topColor={ink} bottomColor={blush} />
        <OurStorySection milestones={placeholderMilestones} />
        <FloralBand images={ourStoryBand} topColor={blush} bottomColor={ivory} />
        <EventDetailsSection items={placeholderItinerary} />
        <TornEdgeDivider topColor={ivory} bottomColor={blush} />
        <TravelStaySection hotels={placeholderHotels} />
        <FloralBand images={travelRsvpBand} topColor={blush} bottomColor={ivory} />
        <RSVPSection />
        <TornEdgeDivider topColor={ivory} bottomColor={blush} />
        <RegistrySection items={placeholderRegistry} />
        <TornEdgeDivider topColor={blush} bottomColor={ivory} />
        <FAQSection items={placeholderFaqItems} />
      </main>
      <TornEdgeDivider topColor={ivory} bottomColor={ink} />
      <FooterSection couple={placeholderCoupleInfo} />
    </>
  )
}
