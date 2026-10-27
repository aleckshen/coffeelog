import { Cafe } from "#models"
import type { Context } from "../context.ts"

export const cafeResolvers = {
  Query: {
    cafes: (_parent: unknown, _args: unknown, { userId }: Context) =>
      Cafe.findAll({ where: { userId }, order: [["cafeName", "ASC"]] }),
  },

  Mutation: {
    createCafe: (
      _parent: unknown,
      { cafeName, location }: { cafeName: string; location: string },
      { userId }: Context,
    ) => Cafe.create({ cafeName, location, userId }),
  },
}
