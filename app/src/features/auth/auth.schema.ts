import { z } from "zod"

export const authSchema = z.object({
  username: z.string().trim().min(1, "Enter your username."),
  password: z.string().min(1, "Enter your password."),
})

export type AuthFormValues = z.infer<typeof authSchema>
