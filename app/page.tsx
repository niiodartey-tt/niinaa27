import { HeroSection } from "@/components/sections/HeroSection"
import { OurStorySection } from "@/components/sections/OurStorySection"
import { EventDetailsSection } from "@/components/sections/EventDetailsSection"
import { TravelStaySection } from "@/components/sections/TravelStaySection"
import { RSVPSection } from "@/components/sections/RSVPSection"
import { RegistrySection } from "@/components/sections/RegistrySection"
import { FAQSection } from "@/components/sections/FAQSection"
import { FooterSection } from "@/components/sections/FooterSection"
import {
  placeholderCoupleInfo,
  placeholderMilestones,
  placeholderItinerary,
  placeholderHotels,
  placeholderFaqItems,
  placeholderRegistry,
} from "@/lib/placeholder-data"

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <HeroSection couple={placeholderCoupleInfo} />
        <OurStorySection milestones={placeholderMilestones} />
        <EventDetailsSection items={placeholderItinerary} />
        <TravelStaySection hotels={placeholderHotels} />
        <RSVPSection />
        <RegistrySection items={placeholderRegistry} />
        <FAQSection items={placeholderFaqItems} />
      </main>
      <FooterSection couple={placeholderCoupleInfo} />
    </>
  )
}
