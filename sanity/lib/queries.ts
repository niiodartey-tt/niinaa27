// All GROQ queries live here — never written inline in page or section components.

export const coupleInfoQuery = `*[_type == "coupleInfo"][0]`

export const storyMilestonesQuery = `
  *[_type == "storyMilestone"] | order(order asc) {
    _id, _type, date, title, description, order
  }
`

export const itineraryItemsQuery = `
  *[_type == "itineraryItem"] | order(order asc) {
    _id, _type, name, time, venue, address, notes, order
  }
`

export const hotelsQuery = `
  *[_type == "hotel"] {
    _id, _type, name, distance, rate, bookingUrl, notes
  }
`

export const faqItemsQuery = `
  *[_type == "faqItem"] | order(order asc) {
    _id, _type, question, answer, order
  }
`

export const registryInfoQuery = `
  *[_type == "registryInfo"] {
    _id, _type, storeName, url, notes
  }
`
