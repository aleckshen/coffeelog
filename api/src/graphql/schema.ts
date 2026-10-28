import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge"
import { cafeResolvers } from "./cafe/resolvers.ts"
import { cafeTypeDefs } from "./cafe/typeDefs.ts"
import { tagResolvers } from "./tag/resolvers.ts"
import { tagTypeDefs } from "./tag/typeDefs.ts"

const rootTypeDefs = `#graphql
  type Query
  type Mutation
`

export const typeDefs = mergeTypeDefs([rootTypeDefs, cafeTypeDefs, tagTypeDefs])
export const resolvers = mergeResolvers([cafeResolvers, tagResolvers])
