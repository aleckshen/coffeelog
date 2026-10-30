import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import Constants from "expo-constants"

const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost"

export const client = new ApolloClient({
  link: new HttpLink({ uri: `http://${host}:4000/` }),
  cache: new InMemoryCache(),
})
