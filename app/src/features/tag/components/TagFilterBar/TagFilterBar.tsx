import { useSuspenseQuery } from "@apollo/client/react"
import { ChevronDown, type LucideIcon, Plus, X } from "lucide-react-native"
import { Pressable, View } from "react-native"
import { useCSSVariable } from "uniwind"
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
        <FilterButton after={ChevronDown} label="Filter by tag" onPress={onOpen} />
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
          after={X}
          key={tag.id}
          label={tag.tagName}
          onPress={() => onRemove(tag.id)}
        />
      ))}
      {hidden > 0 && <FilterButton active label={`+${hidden}`} onPress={onOpen} />}
      <FilterButton before={Plus} label="Tag" onPress={onOpen} />
    </View>
  )
}

type FilterButtonProps = {
  label: string
  onPress: () => void
  active?: boolean
  accessibilityLabel?: string
  before?: LucideIcon
  after?: LucideIcon
}

function FilterButton({
  label,
  onPress,
  active = false,
  accessibilityLabel,
  before: Before,
  after: After,
}: FilterButtonProps) {
  const [onPrimary, muted] = useCSSVariable([
    "--color-primary-foreground",
    "--color-muted-foreground",
  ]) as string[]
  const iconColor = active ? onPrimary : muted

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      className={cn(
        "flex-row items-center gap-1 rounded-full border px-3 py-1.5 active:opacity-70",
        active ? "border-primary bg-primary" : "border-border",
      )}
      onPress={onPress}
    >
      {Before && <Before color={iconColor} size={14} strokeWidth={2.25} />}
      <AppText
        className={cn(
          "font-sans-semibold text-sm",
          active ? "text-primary-foreground" : "text-muted-foreground",
        )}
      >
        {label}
      </AppText>
      {After && <After color={iconColor} size={14} strokeWidth={2.25} />}
    </Pressable>
  )
}
