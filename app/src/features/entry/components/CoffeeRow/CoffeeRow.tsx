import { View } from "react-native"
import { AppText, Chip, ListRow } from "@/components"
import type { CoffeeEntry } from "@/features/entry/entry.queries"
import { formatPrice, formatRating } from "@/lib/stats"

type CoffeeRowProps = {
  entry: CoffeeEntry
  subtitle: string
}

export function CoffeeRow({ entry, subtitle }: CoffeeRowProps) {
  return (
    <ListRow disabled>
      <View className="size-12 items-center justify-center rounded-full bg-muted">
        <AppText className="font-serif text-xl text-muted-foreground">
          {entry.coffeeName[0]}
        </AppText>
      </View>
      <View className="flex-1 gap-1">
        <AppText className="font-sans-semibold">{entry.coffeeName}</AppText>
        <AppText className="text-sm text-muted-foreground">{subtitle}</AppText>
        {entry.tags.length > 0 && (
          <View className="flex-row flex-wrap gap-1.5">
            {entry.tags.map((tag) => (
              <Chip key={tag.id} label={tag.tagName} />
            ))}
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
