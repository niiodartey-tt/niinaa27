const itineraryItem = {
  name: "itineraryItem",
  title: "Itinerary Item",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Event name",
      type: "string",
      description: 'e.g. "Wedding Ceremony" or "Reception & Dinner"',
    },
    {
      name: "time",
      title: "Time",
      type: "string",
      description: 'Display string — e.g. "3:00 PM"',
    },
    {
      name: "venue",
      title: "Venue name",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "notes",
      title: "Notes",
      type: "text",
      rows: 2,
      description: "Optional — dress code reminders, parking, arrival time, etc.",
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first.",
    },
  ],
}

export default itineraryItem
