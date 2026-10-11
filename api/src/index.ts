import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { resolvers } from "./resolvers/index.ts"
import { typeDefs } from "./schema.ts"
import { connectToDb } from "./util/db.ts"

await connectToDb()

const server = new ApolloServer({ typeDefs, resolvers })

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`server ready at ${url}`)
