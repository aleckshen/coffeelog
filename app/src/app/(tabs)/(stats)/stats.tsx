import { View } from "react-native"
import { AppText, Screen } from "@/components"

export default function StatsScreen() {
  return (
    <Screen scroll>
      <View className="mt-2.5 mb-4 flex-row items-center justify-between">
        <AppText className="font-serif text-3xl">[ stats ]</AppText>
      </View>
      <AppText className="mb-4.5 text-sm text-muted-foreground">
        Stats section coming soon!!!
      </AppText>
    </Screen>
  )
}
