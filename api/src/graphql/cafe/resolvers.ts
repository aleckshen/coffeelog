import { Cafe } from "#models"
import type { Context } from "../context.ts"

export const cafeResolvers = {
  Query: {
    cafes: (_parent: unknown, _args: unknown, { userId }: Context) =>
      Cafe.findAll({ where: { userId }, order: [["cafeName", "ASC"]] }),
    cafe: (_parent: unknown, { id }: { id: string }, { userId }: Context) =>
      Cafe.findOne({ where: { id: Number(id), userId } }),
  },

  Mutation: {
    createCafe: (
      _parent: unknown,
      { cafeName, location }: { cafeName: string; location: string },
      { userId }: Context,
    ) => Cafe.create({ cafeName, location, userId }),
    updateCafe: async (
      _parent: unknown,
      { id, cafeName, location }: { id: string; cafeName: string; location: string },
      { userId }: Context,
    ) => {
      const cafe = await Cafe.findOne({ where: { id: Number(id), userId } })
      if (!cafe) return null
      return cafe.update({ cafeName, location })
    },
    deleteCafe: async (_parent: unknown, { id }: { id: string }, { userId }: Context) => {
      const count = await Cafe.destroy({ where: { id: Number(id), userId } })
      return count > 0
    },
  },
}
