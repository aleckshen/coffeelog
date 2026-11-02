import { useSuspenseQuery } from "@apollo/client/react"
import { router } from "expo-router"
import { Suspense } from "react"
import { View } from "react-native"
import { AppText, Button, Screen } from "@/components"
import { CAFES } from "@/features/cafe/cafe.queries"
import { CafeRow } from "@/features/cafe/components/CafeRow/CafeRow"

function CafesList() {
  const { data } = useSuspenseQuery(CAFES)
  return data.cafes.map((cafe) => <CafeRow cafe={cafe} key={cafe.id} />)
}

export default function CafesScreen() {
  return (
    <Screen scroll>
      <View className="mt-2.5 mb-1 flex-row items-center justify-between">
        <AppText className="font-serif text-[28px]">Cafes</AppText>
        <Button label="Add cafe" onPress={() => router.push("/cafe/new")} />
      </View>
      <AppText className="mb-4.5 text-sm text-muted-foreground">
        Every place you've logged a coffee.
      </AppText>
      <Suspense fallback={<AppText className="text-muted-foreground">Loading...</AppText>}>
        <CafesList />
      </Suspense>
    </Screen>
  )
}
