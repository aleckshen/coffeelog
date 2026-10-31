import "@/globals.css"
import { ApolloProvider } from "@apollo/client/react"
import { useFonts } from "expo-font"
import { Stack, ThemeProvider } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useNavigationTheme } from "@/hooks/useNavigationTheme"
import { client } from "@/lib/apollo"
import { fonts } from "@/lib/fonts"

export default function RootLayout() {
  const theme = useNavigationTheme()
  const [loaded] = useFonts(fonts)
  if (!loaded) return null

  return (
    <ApolloProvider client={client}>
      <ThemeProvider value={theme}>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </ApolloProvider>
  )
}
