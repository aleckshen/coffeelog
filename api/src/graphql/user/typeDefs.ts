export const userTypeDefs = `#graphql
  type User {
    id: ID!
    username: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    signUp(username: String!, password: String!): AuthPayload!
    logIn(username: String!, password: String!): AuthPayload!
  }
`
