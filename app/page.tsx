import { HeroSection } from "@/components/sections/HeroSection"
import { OurStorySection } from "@/components/sections/OurStorySection"
import { EventDetailsSection } from "@/components/sections/EventDetailsSection"
import {
  placeholderCoupleInfo,
  placeholderMilestones,
  placeholderItinerary,
} from "@/lib/placeholder-data"

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection couple={placeholderCoupleInfo} />
      <OurStorySection milestones={placeholderMilestones} />
      <EventDetailsSection items={placeholderItinerary} />
    </main>
  )
}
