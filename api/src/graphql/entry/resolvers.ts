import { GraphQLError } from "graphql"
import { Cafe, CoffeeEntry, CoffeeTag, EntryTag } from "#models"
import type { Context } from "../context.ts"

interface EntryInput {
  coffeeName: string
  cafeId: string
  price: string
  rating: string
  notes?: string | null
  photoKey?: string | null
}

export const entryResolvers = {
  Query: {
    entries: (_parent: unknown, _args: unknown, { userId }: Context) =>
      CoffeeEntry.findAll({ where: { userId }, order: [["createdAt", "DESC"]] }),
    entry: (_parent: unknown, { id }: { id: string }, { userId }: Context) =>
      CoffeeEntry.findOne({ where: { id: Number(id), userId } }),
  },

  Mutation: {
    createEntry: async (
      _parent: unknown,
      { input }: { input: EntryInput },
      { userId }: Context,
    ) => {
      const cafe = await Cafe.findOne({ where: { id: Number(input.cafeId), userId } })
      if (!cafe) throw new GraphQLError("Cafe not found")
      return CoffeeEntry.create({ ...input, cafeId: cafe.id, userId })
    },
    updateEntry: async (
      _parent: unknown,
      { id, input }: { id: string; input: EntryInput },
      { userId }: Context,
    ) => {
      const cafe = await Cafe.findOne({ where: { id: Number(input.cafeId), userId } })
      if (!cafe) throw new GraphQLError("Cafe not found")
      const entry = await CoffeeEntry.findOne({ where: { id: Number(id), userId } })
      if (!entry) return null
      return entry.update({ ...input, cafeId: cafe.id })
    },
    deleteEntry: async (_parent: unknown, { id }: { id: string }, { userId }: Context) => {
      const count = await CoffeeEntry.destroy({ where: { id: Number(id), userId } })
      return count > 0
    },
  },

  Entry: {
    createdAt: (entry: CoffeeEntry) => entry.createdAt.toISOString(),
    cafe: (entry: CoffeeEntry) => Cafe.findByPk(entry.cafeId),
    tags: async (entry: CoffeeEntry) => {
      const links = await EntryTag.findAll({ where: { entryId: entry.id } })
      return CoffeeTag.findAll({ where: { id: links.map((link) => link.tagId) } })
    },
  },

  Cafe: {
    coffeeEntries: (cafe: Cafe) =>
      CoffeeEntry.findAll({ where: { cafeId: cafe.id }, order: [["createdAt", "DESC"]] }),
  },
}
