import { View } from "react-native"
import { AppText, Chip, ListRow } from "@/components"
import type { CoffeeEntry } from "@/features/entry/entry.queries"
import { formatPrice, formatRating } from "@/lib/stats"

type CoffeeRowProps = {
  entry: CoffeeEntry
  subtitle: string
}

const CHIP_CHARS = 18

function visibleTags(tags: CoffeeEntry["tags"]) {
  const shown: CoffeeEntry["tags"] = []
  let used = 0
  for (const tag of tags) {
    if (shown.length && used + tag.tagName.length > CHIP_CHARS) break
    shown.push(tag)
    used += tag.tagName.length
  }
  return shown
}

export function CoffeeRow({ entry, subtitle }: CoffeeRowProps) {
  const shown = visibleTags(entry.tags)
  const hidden = entry.tags.length - shown.length

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
