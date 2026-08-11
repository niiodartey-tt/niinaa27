import { HeroSection } from "@/components/sections/HeroSection"
import { OurStorySection } from "@/components/sections/OurStorySection"
import { EventDetailsSection } from "@/components/sections/EventDetailsSection"
import { TravelStaySection } from "@/components/sections/TravelStaySection"
import { RSVPSection } from "@/components/sections/RSVPSection"
import { RegistrySection } from "@/components/sections/RegistrySection"
import { FAQSection } from "@/components/sections/FAQSection"
import { FooterSection } from "@/components/sections/FooterSection"
import { VineDivider } from "@/components/illustrations/VineDivider"
import {
  placeholderCoupleInfo,
  placeholderMilestones,
  placeholderItinerary,
  placeholderFaqItems,
} from "@/lib/placeholder-data"

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <HeroSection
          couple={placeholderCoupleInfo}
          heroImageSrc="/hero-bg.jpg"
        />
        <OurStorySection milestones={placeholderMilestones} />
        <div className="flex justify-center py-6 md:py-8" aria-hidden="true">
          <VineDivider className="w-64 md:w-80 text-taupe" />
        </div>
        <EventDetailsSection items={placeholderItinerary} />
        <div className="flex justify-center py-6 md:py-8" aria-hidden="true">
          <VineDivider className="w-64 md:w-80 text-taupe" />
        </div>
        <TravelStaySection />
        <div className="flex justify-center py-6 md:py-8" aria-hidden="true">
          <VineDivider className="w-64 md:w-80 text-taupe" />
        </div>
        <RSVPSection />
        <div className="flex justify-center py-6 md:py-8" aria-hidden="true">
          <VineDivider className="w-64 md:w-80 text-taupe" />
        </div>
        <RegistrySection />
        <div className="flex justify-center py-6 md:py-8" aria-hidden="true">
          <VineDivider className="w-64 md:w-80 text-taupe" />
        </div>
        <FAQSection items={placeholderFaqItems} />
      </main>
      <FooterSection couple={placeholderCoupleInfo} />
    </>
  )
}
