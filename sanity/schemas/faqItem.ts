const faqItem = {
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    {
      name: "question",
      title: "Question",
      type: "string",
    },
    {
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 3,
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first in the accordion.",
    },
  ],
}

export default faqItem
