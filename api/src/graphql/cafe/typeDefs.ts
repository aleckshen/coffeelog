export const cafeTypeDefs = `#graphql
  type Cafe {
    id: ID!
    cafeName: String!
    location: String!
  }

  extend type Query {
    cafes: [Cafe!]!
  }

  extend type Mutation {
    createCafe(cafeName: String!, location: String!): Cafe!
  }
`
