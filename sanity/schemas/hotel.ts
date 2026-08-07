const hotel = {
  name: "hotel",
  title: "Hotel",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Hotel name",
      type: "string",
    },
    {
      name: "distance",
      title: "Distance from venue",
      type: "string",
      description: 'Display string — e.g. "15 minutes from venue"',
    },
    {
      name: "rate",
      title: "Rate",
      type: "string",
      description: 'Display string — e.g. "From $120 / night"',
    },
    {
      name: "bookingUrl",
      title: "Booking URL",
      type: "url",
    },
    {
      name: "notes",
      title: "Notes",
      type: "text",
      rows: 2,
      description: "Optional — group rates, promo codes, things to know.",
    },
  ],
}

export default hotel
