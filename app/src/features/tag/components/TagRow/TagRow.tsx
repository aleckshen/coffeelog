import { AppText, ListRow } from "@/components"
import type { Tag } from "@/features/tag/tag.queries"

type TagRowProps = {
  tag: Tag
}

export function TagRow({ tag }: TagRowProps) {
  return (
    <ListRow disabled>
      <AppText className="flex-1 font-sans-semibold">{tag.tagName}</AppText>
      <AppText className="text-sm text-muted-foreground">
        {tag.coffeeCount} {tag.coffeeCount === 1 ? "coffee" : "coffees"}
      </AppText>
    </ListRow>
  )
}
