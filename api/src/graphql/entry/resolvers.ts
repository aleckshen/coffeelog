import { GraphQLError } from "graphql"
import { Cafe, CoffeeEntry, CoffeeTag, EntryTag } from "#models"
import { authed } from "../../lib/auth.ts"

interface EntryInput {
  coffeeName: string
  cafeId: string
  price: string
  rating: string
  notes?: string | null
  photoKey?: string | null
  tagIds?: string[] | null
}

const findUserTags = async (tagIds: string[], userId: number) => {
  const tags = await CoffeeTag.findAll({ where: { id: tagIds.map(Number), userId } })
  if (tags.length !== new Set(tagIds).size) throw new GraphQLError("Tag not found")
  return tags
}

export const entryResolvers = {
  Query: {
    entries: authed((_parent, _args: unknown, { userId }) =>
      CoffeeEntry.findAll({ where: { userId }, order: [["createdAt", "DESC"]] }),
    ),
    entry: authed((_parent, { id }: { id: string }, { userId }) =>
      CoffeeEntry.findOne({ where: { id: Number(id), userId } }),
    ),
  },

  Mutation: {
    createEntry: authed(async (_parent, { input }: { input: EntryInput }, { userId }) => {
      const { tagIds, ...fields } = input
      const cafe = await Cafe.findOne({ where: { id: Number(input.cafeId), userId } })
      if (!cafe) throw new GraphQLError("Cafe not found")
      const tags = await findUserTags(tagIds ?? [], userId)

      const entry = await CoffeeEntry.create({ ...fields, cafeId: cafe.id, userId })
      await EntryTag.bulkCreate(tags.map((tag) => ({ entryId: entry.id, tagId: tag.id })))
      return entry
    }),
    updateEntry: authed(
      async (_parent, { id, input }: { id: string; input: EntryInput }, { userId }) => {
        const { tagIds, ...fields } = input
        const cafe = await Cafe.findOne({ where: { id: Number(input.cafeId), userId } })
        if (!cafe) throw new GraphQLError("Cafe not found")
        const entry = await CoffeeEntry.findOne({ where: { id: Number(id), userId } })
        if (!entry) return null
        const tags = await findUserTags(tagIds ?? [], userId)

        await entry.update({ ...fields, cafeId: cafe.id })
        await EntryTag.destroy({ where: { entryId: entry.id } })
        await EntryTag.bulkCreate(tags.map((tag) => ({ entryId: entry.id, tagId: tag.id })))
        return entry
      },
    ),
    deleteEntry: authed(async (_parent, { id }: { id: string }, { userId }) => {
      const count = await CoffeeEntry.destroy({ where: { id: Number(id), userId } })
      return count > 0
    }),
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

  Tag: {
    coffeeCount: (tag: CoffeeTag) => EntryTag.count({ where: { tagId: tag.id } }),
  },
}
