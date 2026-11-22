import { randomUUID } from "node:crypto"
import { authed } from "../../lib/auth.ts"
import { photoUploadUrl } from "../../lib/r2.ts"

export const photoResolvers = {
  Mutation: {
    createPhotoUpload: authed(async (_parent, _args: unknown, { userId }) => {
      const key = `users/${userId}/${randomUUID()}.jpg`
      const uploadUrl = await photoUploadUrl(key)
      return { key, uploadUrl }
    }),
  },
}
