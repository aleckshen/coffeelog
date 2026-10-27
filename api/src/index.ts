import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { resolvers } from "./graphql/resolvers/index.ts"
import { typeDefs } from "./graphql/schema.ts"
import { connectToDb } from "./db/db.ts"

await connectToDb()

const server = new ApolloServer({ typeDefs, resolvers })

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`server ready at ${url}`)
