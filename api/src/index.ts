import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { connectToDb } from "./db/db.ts"
import type { Context } from "./graphql/context.ts"
import { resolvers, typeDefs } from "./graphql/schema.ts"

await connectToDb()

const server = new ApolloServer<Context>({ typeDefs, resolvers })

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => ({ userId: 1 }),
})

console.log(`server ready at ${url}`)
