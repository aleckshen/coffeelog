import "@/globals.css"
import { ApolloProvider } from "@apollo/client/react"
import { useFonts } from "expo-font"
import { Stack, ThemeProvider } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { useNavigationTheme } from "@/hooks/useNavigationTheme"
import { client } from "@/lib/apollo"
import { fonts } from "@/lib/fonts"
import { loadToken, useToken } from "@/lib/session"

export default function RootLayout() {
  const theme = useNavigationTheme()
  const [loaded] = useFonts(fonts)
  const token = useToken()

  useEffect(() => {
    void loadToken()
  }, [])

  if (!loaded || token === undefined) return null

  return (
    <ApolloProvider client={client}>
      <ThemeProvider value={theme}>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={token !== null}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(modals)" options={{ presentation: "modal" }} />
          </Stack.Protected>
          <Stack.Protected guard={token === null}>
            <Stack.Screen name="login" />
          </Stack.Protected>
        </Stack>
      </ThemeProvider>
    </ApolloProvider>
  )
}
