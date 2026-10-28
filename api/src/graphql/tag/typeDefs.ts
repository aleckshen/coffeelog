export const tagTypeDefs = `#graphql
  type Tag { 
    id: ID!
    tagName: String!
  }

  extend type Query {
    tags: [Tag!]!
  }

  extend type Mutation {
    createTag(tagName: String!): Tag!
    deleteTag(id: ID!): Boolean!
  }
`
