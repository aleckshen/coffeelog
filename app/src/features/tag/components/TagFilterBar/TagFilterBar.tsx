import { useSuspenseQuery } from "@apollo/client/react"
import { Pressable, View } from "react-native"
import { AppText } from "@/components"
import { TAGS } from "@/features/tag/tag.queries"
import { fitOnOneLine } from "@/lib/chips"
import { cn } from "@/lib/cn"

type TagFilterBarProps = {
  selectedTagIds: string[]
  onOpen: () => void
  onRemove: (tagId: string) => void
}

export function TagFilterBar({ selectedTagIds, onOpen, onRemove }: TagFilterBarProps) {
  const { data } = useSuspenseQuery(TAGS)
  const selected = selectedTagIds.flatMap((id) => data.tags.find((tag) => tag.id === id) ?? [])

  if (!selected.length) {
    return (
      <View className="mt-5 flex-row">
        <FilterButton label="Filter by tag ▾" onPress={onOpen} />
      </View>
    )
  }

  const shown = fitOnOneLine(selected, (tag) => tag.tagName)
  const hidden = selected.length - shown.length

  return (
    <View className="mt-5 flex-row gap-1.5 overflow-hidden">
      {shown.map((tag) => (
        <FilterButton
          accessibilityLabel={`Remove ${tag.tagName} filter`}
          active
          key={tag.id}
          label={`${tag.tagName} ✕`}
          onPress={() => onRemove(tag.id)}
        />
      ))}
      {hidden > 0 && <FilterButton active label={`+${hidden}`} onPress={onOpen} />}
      <FilterButton label="+ Tag" onPress={onOpen} />
    </View>
  )
}

type FilterButtonProps = {
  label: string
  onPress: () => void
  active?: boolean
  accessibilityLabel?: string
}

function FilterButton({ label, onPress, active = false, accessibilityLabel }: FilterButtonProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      className={cn(
        "rounded-full border px-3 py-1.5 active:opacity-70",
        active ? "border-primary bg-primary" : "border-border",
      )}
      onPress={onPress}
    >
      <AppText
        className={cn(
          "font-sans-semibold text-sm",
          active ? "text-primary-foreground" : "text-muted-foreground",
        )}
      >
        {label}
      </AppText>
    </Pressable>
  )
}
