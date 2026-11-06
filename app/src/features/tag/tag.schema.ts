import { z } from "zod"

export const tagSchema = z.object({
  tagName: z.string().trim().min(1, "Give the tag a name."),
})

export type TagFormValues = z.infer<typeof tagSchema>
