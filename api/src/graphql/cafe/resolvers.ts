import { Cafe } from "#models"
import { authed } from "../../lib/auth.ts"

export const cafeResolvers = {
  Query: {
    cafes: authed((_parent, _args: unknown, { userId }) =>
      Cafe.findAll({ where: { userId }, order: [["cafeName", "ASC"]] }),
    ),
    cafe: authed((_parent, { id }: { id: string }, { userId }) =>
      Cafe.findOne({ where: { id: Number(id), userId } }),
    ),
  },

  Mutation: {
    createCafe: authed(
      (_parent, { cafeName, location }: { cafeName: string; location: string }, { userId }) =>
        Cafe.create({ cafeName, location, userId }),
    ),
    updateCafe: authed(
      async (
        _parent,
        { id, cafeName, location }: { id: string; cafeName: string; location: string },
        { userId },
      ) => {
        const cafe = await Cafe.findOne({ where: { id: Number(id), userId } })
        if (!cafe) return null
        return cafe.update({ cafeName, location })
      },
    ),
    deleteCafe: authed(async (_parent, { id }: { id: string }, { userId }) => {
      const count = await Cafe.destroy({ where: { id: Number(id), userId } })
      return count > 0
    }),
  },
}
