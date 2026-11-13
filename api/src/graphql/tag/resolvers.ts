import { CoffeeTag } from "#models"
import { authed } from "../../lib/auth.ts"

export const tagResolvers = {
  Query: {
    tags: authed((_parent, _args: unknown, { userId }) =>
      CoffeeTag.findAll({ where: { userId }, order: [["tagName", "ASC"]] }),
    ),
  },

  Mutation: {
    createTag: authed((_parent, { tagName }: { tagName: string }, { userId }) =>
      CoffeeTag.create({ tagName, userId }),
    ),
    deleteTag: authed(async (_parent, { id }: { id: string }, { userId }) => {
      const count = await CoffeeTag.destroy({ where: { id: Number(id), userId } })
      return count > 0
    }),
  },
}
