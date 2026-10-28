import { CoffeeTag } from "#models"
import type { Context } from "../context.ts"

export const tagResolvers = {
  Query: {
    tags: (_parent: unknown, _args: unknown, { userId }: Context) =>
      CoffeeTag.findAll({ where: { userId }, order: [["tagName", "ASC"]] }),
  },

  Mutation: {
    createTag: (_parent: unknown, { tagName }: { tagName: string }, { userId }: Context) =>
      CoffeeTag.create({ tagName, userId }),
    deleteTag: async (_parent: unknown, { id }: { id: string }, { userId }: Context) => {
      const count = await CoffeeTag.destroy({ where: { id: Number(id), userId } })
      return count > 0
    },
  },
}
