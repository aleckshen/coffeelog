import { Image } from "expo-image"
import { router, useSegments } from "expo-router"
import { Image as ImageIcon } from "lucide-react-native"
import { View } from "react-native"
import { useCSSVariable } from "uniwind"
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
  const muted = useCSSVariable("--color-muted-foreground") as string
  // The Coffee screen lives in both the Log and Cafes stacks; open it in the one you're in.
  const pathname =
    segments[1] === "(cafes)" ? "/(tabs)/(cafes)/entry/[id]" : "/(tabs)/(log)/entry/[id]"
  const shown = fitOnOneLine(entry.tags, (tag) => tag.tagName)
  const hidden = entry.tags.length - shown.length

  return (
    <ListRow onPress={() => router.push({ pathname, params: { id: entry.id } })}>
      <View className="size-12 items-center justify-center overflow-hidden rounded-xl bg-muted">
        {entry.photoUrl ? (
          <Image
            contentFit="cover"
            source={{ uri: entry.photoUrl, cacheKey: entry.photoKey ?? undefined }}
            style={{ width: "100%", height: "100%" }}
            transition={150}
          />
        ) : (
          <ImageIcon color={muted} size={20} strokeWidth={1.7} />
        )}
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
