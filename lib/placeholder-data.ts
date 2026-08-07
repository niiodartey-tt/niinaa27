import type {
  CoupleInfo,
  StoryMilestone,
  ItineraryItem,
  Hotel,
  FaqItem,
  RegistryInfo,
} from "@/types/sanity"

// Real wedding details — replace section-specific placeholder text in Sanity
// before Sprint 3 goes live. Date and names are confirmed.

export const placeholderCoupleInfo: CoupleInfo = {
  _id: "couple-info",
  _type: "coupleInfo",
  names: "Nii & Naa",
  bio: "A chance meeting, a shared laugh, and years of adventures later — we are ready to begin our greatest one yet. We cannot wait to celebrate with you.",
  weddingDate: "2027-01-02",
  locationName: "Accra, Ghana",
}

export const placeholderMilestones: StoryMilestone[] = [
  {
    _id: "milestone-1",
    _type: "storyMilestone",
    date: "2019",
    title: "The first meeting",
    description: "We met through mutual friends at a gathering neither of us planned to attend. One conversation turned into the rest of the evening.",
    order: 1,
  },
  {
    _id: "milestone-2",
    _type: "storyMilestone",
    date: "2020",
    title: "First trip together",
    description: "A long weekend away — we came back knowing this was something worth holding onto.",
    order: 2,
  },
  {
    _id: "milestone-3",
    _type: "storyMilestone",
    date: "2022",
    title: "Making it official",
    description: "We stopped calling it casual and started calling it ours.",
    order: 3,
  },
  {
    _id: "milestone-4",
    _type: "storyMilestone",
    date: "2026",
    title: "The proposal",
    description: "One quiet evening, the question was asked. The answer was yes before it was finished.",
    order: 4,
  },
]

export const placeholderItinerary: ItineraryItem[] = [
  {
    _id: "itinerary-ceremony",
    _type: "itineraryItem",
    name: "Wedding Ceremony",
    time: "3:00 PM",
    venue: "Venue to be confirmed",
    address: "Accra, Ghana",
    notes: "Please arrive by 2:45 PM. Smart attire requested.",
    order: 1,
  },
  {
    _id: "itinerary-reception",
    _type: "itineraryItem",
    name: "Reception & Dinner",
    time: "6:00 PM",
    venue: "Venue to be confirmed",
    address: "Accra, Ghana",
    order: 2,
  },
]

export const placeholderHotels: Hotel[] = [
  {
    _id: "hotel-1",
    _type: "hotel",
    name: "Kempinski Hotel Gold Coast City",
    distance: "15 minutes from venue",
    rate: "From $180 / night",
    bookingUrl: "https://www.kempinski.com/accra",
    notes: "Mention the Nii & Naa wedding for a preferred rate.",
  },
  {
    _id: "hotel-2",
    _type: "hotel",
    name: "Labadi Beach Hotel",
    distance: "20 minutes from venue",
    rate: "From $120 / night",
    bookingUrl: "https://www.labadibeachhotel.com",
  },
  {
    _id: "hotel-3",
    _type: "hotel",
    name: "African Regent Hotel",
    distance: "10 minutes from venue",
    rate: "From $95 / night",
    bookingUrl: "https://www.africanregenthotel.com",
    notes: "Boutique option with complimentary breakfast.",
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
