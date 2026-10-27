import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge"
import { cafeResolvers } from "./cafe/resolvers.ts"
import { cafeTypeDefs } from "./cafe/typeDefs.ts"

const rootTypeDefs = `#graphql
  type Query
  type Mutation
`

export const typeDefs = mergeTypeDefs([rootTypeDefs, cafeTypeDefs])
export const resolvers = mergeResolvers([cafeResolvers])
