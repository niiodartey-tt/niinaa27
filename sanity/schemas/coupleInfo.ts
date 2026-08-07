const coupleInfo = {
  name: "coupleInfo",
  title: "Couple Info",
  type: "document",
  fields: [
    {
      name: "names",
      title: "Names",
      type: "string",
      description: 'e.g. "Nii & Naa"',
    },
    {
      name: "bio",
      title: "Bio / Story intro",
      type: "text",
      rows: 3,
      description: "Short paragraph shown in the Hero section.",
    },
    {
      name: "weddingDate",
      title: "Wedding date",
      type: "date",
      description: "ISO date — e.g. 2027-01-02",
    },
    {
      name: "locationName",
      title: "Location name",
      type: "string",
      description: 'City or venue name shown in the Hero — e.g. "Accra, Ghana"',
    },
  ],
}

export default coupleInfo
