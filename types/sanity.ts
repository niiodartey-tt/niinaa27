export interface CoupleInfo {
  _id: string
  _type: "coupleInfo"
  names: string
  bio: string
  weddingDate: string
  locationName: string
}

export interface StoryMilestone {
  _id: string
  _type: "storyMilestone"
  date: string
  title: string
  description: string
  order: number
  imageUrl?: string
  imageAlt?: string
}

export interface ItineraryItem {
  _id: string
  _type: "itineraryItem"
  name: string
  time: string
  venue: string
  address: string
  notes?: string
  order: number
}

export interface Hotel {
  _id: string
  _type: "hotel"
  name: string
  distance: string
  rate: string
  bookingUrl: string
  notes?: string
}

export interface FaqItem {
  _id: string
  _type: "faqItem"
  question: string
  answer: string
  order: number
}

export interface RegistryInfo {
  _id: string
  _type: "registryInfo"
  storeName: string
  url: string
  notes?: string
}
