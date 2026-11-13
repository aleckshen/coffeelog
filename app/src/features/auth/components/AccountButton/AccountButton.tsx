import { useQuery } from "@apollo/client/react"
import { router } from "expo-router"
import { Pressable } from "react-native"
import { AppText } from "@/components"
import { ME } from "@/features/auth/auth.queries"

export function AccountButton() {
  const { data } = useQuery(ME)
  const initials = data?.me?.username.slice(0, 2).toUpperCase() ?? ""

  return (
    <Pressable
      accessibilityLabel="Account"
      accessibilityRole="button"
      className="size-10 items-center justify-center rounded-full bg-muted active:opacity-70"
      onPress={() => router.push("/account")}
    >
      <AppText className="font-sans-semibold text-sm text-muted-foreground">{initials}</AppText>
    </Pressable>
  )
}
