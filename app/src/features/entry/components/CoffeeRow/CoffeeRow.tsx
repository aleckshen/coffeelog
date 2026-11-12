import { router, useSegments } from "expo-router"
import { View } from "react-native"
import { AppText, Chip, ListRow, MetaLine } from "@/components"
import type { CoffeeEntry } from "@/features/entry/entry.queries"
import { fitOnOneLine } from "@/lib/chips"
import { formatPrice, formatRating } from "@/lib/stats"

type CoffeeRowProps = {
  entry: CoffeeEntry
  subtitle: string[]
}

export function CoffeeRow({ entry, subtitle }: CoffeeRowProps) {
  const segments = useSegments()
  // The Coffee screen lives in both the Log and Cafes stacks; open it in the one you're in.
  const pathname =
    segments[1] === "(cafes)" ? "/(tabs)/(cafes)/entry/[id]" : "/(tabs)/(log)/entry/[id]"
  const shown = fitOnOneLine(entry.tags, (tag) => tag.tagName)
  const hidden = entry.tags.length - shown.length

  return (
    <ListRow onPress={() => router.push({ pathname, params: { id: entry.id } })}>
      <View className="size-12 items-center justify-center rounded-full bg-muted">
        <AppText className="font-serif text-xl text-muted-foreground">
          {entry.coffeeName[0]}
        </AppText>
      </View>
      <View className="flex-1 gap-1">
        <AppText className="font-sans-semibold">{entry.coffeeName}</AppText>
        <MetaLine parts={subtitle} small />
        {entry.tags.length > 0 && (
          <View className="flex-row gap-1.5 overflow-hidden">
            {shown.map((tag) => (
              <Chip key={tag.id} label={tag.tagName} />
            ))}
            {hidden > 0 && <Chip label={`+${hidden}`} />}
          </View>
        )}
      </View>
      <View className="items-end gap-0.5">
        <AppText className="font-mono-medium text-lg">
          {formatRating(Number(entry.rating))}
          <AppText className="text-xs text-muted-foreground">/10</AppText>
        </AppText>
        <AppText className="font-mono text-sm text-muted-foreground">
          {formatPrice(Number(entry.price))}
        </AppText>
      </View>
    </ListRow>
  )
}
