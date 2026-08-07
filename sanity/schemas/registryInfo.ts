const registryInfo = {
  name: "registryInfo",
  title: "Registry Info",
  type: "document",
  fields: [
    {
      name: "storeName",
      title: "Store name",
      type: "string",
    },
    {
      name: "url",
      title: "Registry URL",
      type: "url",
    },
    {
      name: "notes",
      title: "Notes",
      type: "text",
      rows: 2,
      description: "Optional — anything guests should know about this registry.",
    },
  ],
}

export default registryInfo
