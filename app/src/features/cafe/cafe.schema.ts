import { z } from "zod"

export const cafeSchema = z.object({
  cafeName: z.string().trim().min(1, "Give the cafe a name."),
  location: z.string().trim().min(1, "Add a location."),
})

export type CafeFormValues = z.infer<typeof cafeSchema>
