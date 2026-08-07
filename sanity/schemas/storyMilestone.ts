const storyMilestone = {
  name: "storyMilestone",
  title: "Story Milestone",
  type: "document",
  fields: [
    {
      name: "date",
      title: "Date / Year",
      type: "string",
      description: 'Display string — e.g. "2019" or "Summer 2022"',
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Short headline for this milestone.",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first in the timeline.",
    },
  ],
}

export default storyMilestone
