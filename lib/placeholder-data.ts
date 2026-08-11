import type {
  CoupleInfo,
  StoryMilestone,
  ItineraryItem,
  FaqItem,
  RegistryInfo,
} from "@/types/sanity"

// Real wedding details — replace section-specific placeholder text in Sanity
// before Sprint 3 goes live. Date and names are confirmed.

export const placeholderCoupleInfo: CoupleInfo = {
  _id: "couple-info",
  _type: "coupleInfo",
  names: "Thomas & Leanne",
  bio: "A chance meeting, a shared laugh, and years of adventures later — we are ready to begin our greatest one yet. We cannot wait to celebrate with you.",
  weddingDate: "2027-01-02",
  locationName: "Accra, Ghana",
}

export const placeholderMilestones: StoryMilestone[] = [
  {
    _id: "milestone-1",
    _type: "storyMilestone",
    date: "13 April 2021",
    title: "Where It Began",
    description: "On 13 April 2021, a friendship began — the kind that didn't rush anywhere, just settled in and stayed.",
    order: 1,
  },
  {
    _id: "milestone-2",
    _type: "storyMilestone",
    date: "2022",
    title: "Growing Roots",
    description: "What started as friendship kept finding reasons to grow. Conversations got longer. Trust got deeper.",
    order: 2,
  },
  {
    _id: "milestone-3",
    _type: "storyMilestone",
    date: "2023",
    title: "Closer Still",
    description: "Somewhere in the everyday — the calls, the check-ins, the showing up — something steady was taking shape.",
    order: 3,
  },
  {
    _id: "milestone-4",
    _type: "storyMilestone",
    date: "2024",
    title: "No Turning Back",
    description: "By now, it was clear this wasn't just friendship anymore. It just hadn't been said out loud yet.",
    order: 4,
  },
  {
    _id: "milestone-5",
    _type: "storyMilestone",
    date: "2025",
    title: "Made Official",
    description: "One text changed everything. A heart poured out, an answer given — and what had quietly grown for years finally had a name.",
    order: 5,
  },
  {
    _id: "milestone-6",
    _type: "storyMilestone",
    date: "January 2026",
    title: "The Knocking",
    description: "Families came together as tradition asked for tradition's answer — and the promise made privately became a promise shared.",
    order: 6,
  },
  {
    _id: "milestone-7",
    _type: "storyMilestone",
    date: "2 January 2027",
    title: "The Wedding",
    description: "The friendship that began in 2021 becomes a marriage — witnessed, celebrated, and just the beginning.",
    order: 7,
  },
]

export const placeholderItinerary: ItineraryItem[] = [
  {
    _id: "itinerary-ceremony",
    _type: "itineraryItem",
    name: "Wedding Ceremony",
    time: "3:00 PM",
    venue: "Skybox Event Centre, Lashibi",
    address: "Lashibi, Accra, Ghana",
    notes: "Please arrive by 2:45 PM.",
    order: 1,
  },
  {
    _id: "itinerary-reception",
    _type: "itineraryItem",
    name: "Dinner & Celebration",
    time: "5:00 PM",
    venue: "Skybox Event Centre, Lashibi",
    address: "Lashibi, Accra, Ghana",
    notes: "Cocktail hour from 5:00 PM, seated dinner at 6:30 PM.",
    order: 2,
  },
]

export const placeholderFaqItems: FaqItem[] = [
  {
    _id: "faq-1",
    _type: "faqItem",
    question: "What is the dress code?",
    answer: "Smart/elegant attire. We would love to see colour — florals and prints are very welcome. Please avoid all-white.",
    order: 1,
  },
  {
    _id: "faq-2",
    _type: "faqItem",
    question: "Can I bring a plus-one?",
    answer: "Your invitation will indicate whether a plus-one has been included. If you are unsure, please reach out to us directly.",
    order: 2,
  },
  {
    _id: "faq-3",
    _type: "faqItem",
    question: "Are children welcome?",
    answer: "We love your little ones, but this is an adults-only celebration. We hope you will enjoy the evening off.",
    order: 3,
  },
  {
    _id: "faq-4",
    _type: "faqItem",
    question: "When is the RSVP deadline?",
    answer: "Please RSVP by 1 December 2026 so we can finalise numbers with our catering team.",
    order: 4,
  },
  {
    _id: "faq-5",
    _type: "faqItem",
    question: "Will there be parking at the venue?",
    answer: "Yes, parking will be available at the venue. Details will be shared closer to the date.",
    order: 5,
  },
  {
    _id: "faq-6",
    _type: "faqItem",
    question: "What if I have a dietary requirement?",
    answer: "Please note your dietary needs in the RSVP form. We will do our best to accommodate everyone.",
    order: 6,
  },
]

export const placeholderRegistry: RegistryInfo[] = [
  {
    _id: "registry-1",
    _type: "registryInfo",
    storeName: "Registry details to follow",
    url: "#",
    notes: "We are finalising our registry — check back soon.",
  },
]
