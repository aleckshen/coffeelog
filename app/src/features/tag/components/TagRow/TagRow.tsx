import { Pressable } from "react-native"
import { AppText, ListRow } from "@/components"
import type { Tag } from "@/features/tag/tag.queries"

type TagRowProps = {
  tag: Tag
  onPress: () => void
  onDelete: () => void
}

export function TagRow({ tag, onDelete, onPress }: TagRowProps) {
  return (
    <ListRow onPress={onPress}>
      <AppText className="flex-1 font-sans-semibold">{tag.tagName}</AppText>
      <AppText className="text-sm text-muted-foreground">
        {tag.coffeeCount} {tag.coffeeCount === 1 ? "coffee" : "coffees"}
      </AppText>
      <Pressable
        accessibilityRole="button"
        className="rounded-full border border-border px-3 py-1 active:opacity-70"
        onPress={onDelete}
      >
        <AppText className="font-sans-semibold text-xs text-muted-foreground">Delete</AppText>
      </Pressable>
    </ListRow>
  )
}
