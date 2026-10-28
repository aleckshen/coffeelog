export const entryTypeDefs = `#graphql
  type Entry {
    id: ID!
    coffeeName: String!
    price: String!
    rating: String!
    notes: String
    photoKey: String
    createdAt: String!
    cafe: Cafe!
  }

  extend type Query {
    entries: [Entry!]!
    entry(id: ID!): Entry
  }

  input EntryInput {
    coffeeName: String!
    cafeId: ID!
    price: String!
    rating: String!
    notes: String
    photoKey: String
  }

  extend type Mutation {
    createEntry(input: EntryInput!): Entry!
    updateEntry(id: ID!, input: EntryInput!): Entry
    deleteEntry(id: ID!): Boolean!
  }
`
