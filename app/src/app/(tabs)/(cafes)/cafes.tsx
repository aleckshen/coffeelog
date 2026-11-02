import { useSuspenseQuery } from "@apollo/client/react"
import { router } from "expo-router"
import { Suspense } from "react"
import { View } from "react-native"
import { AppText, Button, Screen } from "@/components"
import { CAFES } from "@/features/cafe/cafe.queries"

function CafesList() {
  const { data } = useSuspenseQuery(CAFES)
  return data.cafes.map((cafe) => <AppText key={cafe.id}>{cafe.cafeName}</AppText>)
}

export default function CafesScreen() {
  return (
    <Screen scroll>
      <View className="mt-2.5 mb-1 flex-row items-center justify-between">
        <AppText className="font-serif text-[28px]">Cafes</AppText>
        <Button label="Add cafe" onPress={() => router.push("/cafe/new")} />
      </View>
      <Suspense fallback={<AppText className="text-muted-foreground">Loading...</AppText>}>
        <CafesList />
      </Suspense>
    </Screen>
  )
}
