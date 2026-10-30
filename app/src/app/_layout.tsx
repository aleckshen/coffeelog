import { ApolloProvider } from "@apollo/client/react"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { client } from "@/lib/apollo"

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </ApolloProvider>
  )
}
