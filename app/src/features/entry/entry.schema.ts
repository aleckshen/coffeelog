import { z } from "zod"
import type { EntryInput } from "@/features/entry/entry.mutations"

export const entrySchema = z.object({
  coffeeName: z.string().trim().min(1, "Give the coffee a name."),
  cafeId: z.string().min(1, "Pick a cafe."),
  rating: z.number().min(0).max(10),
  price: z
    .string()
    .trim()
    .regex(/^\d+(\.\d{1,2})?$/, "Enter a price, like 5.20."),
  tagIds: z.array(z.string()),
  notes: z.string().trim(),
})

export type EntryFormValues = z.infer<typeof entrySchema>

export function toEntryInput(values: EntryFormValues): EntryInput {
  return { ...values, rating: values.rating.toFixed(1), notes: values.notes || null }
}
