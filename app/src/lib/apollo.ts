import {
  ApolloClient,
  ApolloLink,
  CombinedGraphQLErrors,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import { SetContextLink } from "@apollo/client/link/context"
import { ErrorLink } from "@apollo/client/link/error"
import Constants from "expo-constants"
import { clearToken, getToken } from "@/lib/session"

const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost"

const authLink = new SetContextLink((prevContext) => {
  const token = getToken()
  if (!token) return {}
  return { headers: { ...prevContext.headers, authorization: `Bearer ${token}` } }
})

// An expired or invalid token sends you back to the login screen.
const logoutLink = new ErrorLink(({ error }) => {
  if (
    CombinedGraphQLErrors.is(error) &&
    error.errors.some((e) => e.extensions?.code === "UNAUTHENTICATED")
  ) {
    void signOut()
  }
})

export const client = new ApolloClient({
  link: ApolloLink.from([logoutLink, authLink, new HttpLink({ uri: `http://${host}:4000/` })]),
  cache: new InMemoryCache(),
})

export async function signOut() {
  await clearToken()
  await client.clearStore()
}
