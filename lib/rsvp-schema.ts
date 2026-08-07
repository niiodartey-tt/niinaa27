import { z } from "zod"

export const rsvpSchema = z.object({
  name:         z.string().min(1, "Name is required").max(100).trim(),
  email:        z.string().email("Please enter a valid email address").max(254).trim(),
  attending:    z.boolean(),
  guestCount:   z.number().int().min(1).max(10),
  dietaryNotes: z.string().max(500).trim().optional(),
  message:      z.string().max(1000).trim().optional(),
  _honeypot:    z.string().max(0).optional(),
})

export type RSVPFormValues = z.infer<typeof rsvpSchema>
