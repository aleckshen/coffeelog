import { router } from "expo-router"
import { View } from "react-native"
import { AppText, ListRow } from "@/components"
import type { Cafe } from "@/features/cafe/cafe.queries"
import { averageRating, formatRating } from "@/lib/stats"

type CafeRowProps = {
  cafe: Cafe
}

export function CafeRow({ cafe }: CafeRowProps) {
  const average = averageRating(cafe.coffeeEntries)
  const count = cafe.coffeeEntries.length

  return (
    <ListRow onPress={() => router.push({ pathname: "/cafe/[id]", params: { id: cafe.id } })}>
      <View className="flex-1 gap-1">
        <AppText className="font-sans-semibold">{cafe.cafeName}</AppText>
        <AppText className="text-sm text-muted-foreground">{cafe.location}</AppText>
      </View>
      <View className="items-end gap-0.5">
        <AppText className="font-mono-medium text-lg">{formatRating(average)}</AppText>
        <AppText className="text-xs text-muted-foreground">
          {count} {count === 1 ? "coffee" : "coffees"}
        </AppText>
      </View>
      <AppText className="text-xl text-muted-foreground">›</AppText>
    </ListRow>
  )
}
