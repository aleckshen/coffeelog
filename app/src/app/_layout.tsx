import "@/globals.css"
import { ApolloProvider } from "@apollo/client/react"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { client } from "@/lib/apollo"
import { fonts } from "@/lib/fonts"

export default function RootLayout() {
  const [loaded] = useFonts(fonts)
  if (!loaded) return null

  return (
    <ApolloProvider client={client}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </ApolloProvider>
  )
}
