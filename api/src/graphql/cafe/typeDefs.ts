export const cafeTypeDefs = `#graphql
type Cafe {
    id: ID!
    cafeName: String!
    location: String!
  }

  extend type Query {
    cafes: [Cafe!]!
    cafe(id: ID!): Cafe
  }

  extend type Mutation {
    createCafe(cafeName: String!, location: String!): Cafe!
    updateCafe(id: ID!, cafeName: String!, location: String!): Cafe
    deleteCafe(id: ID!): Boolean!
  }
`
