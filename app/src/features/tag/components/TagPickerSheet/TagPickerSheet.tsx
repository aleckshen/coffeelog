import { useSuspenseQuery } from "@apollo/client/react"
import { useState } from "react"
import { Modal, Pressable, View } from "react-native"
import { AppText, ListRow, ModalHeader, Skeleton, SuspenseSection, TextField } from "@/components"
import { TAGS } from "@/features/tag/tag.queries"

type TagFilterSheetProps = {
  visible: boolean
  selectedTagIds: string[]
  onDone: (tagIds: string[]) => void
  onCancel: () => void
}

export function TagFilterSheet({ visible, selectedTagIds, onDone, onCancel }: TagFilterSheetProps) {
  return (
    <Modal
      animationType="slide"
      onRequestClose={onCancel}
      presentationStyle="pageSheet"
      visible={visible}
    >
      <SheetBody onCancel={onCancel} onDone={onDone} selectedTagIds={selectedTagIds} />
    </Modal>
  )
}

function SheetBody({ selectedTagIds, onDone, onCancel }: Omit<TagFilterSheetProps, "visible">) {
  const [picked, setPicked] = useState(selectedTagIds)
  const [search, setSearch] = useState("")

  function toggle(id: string) {
    setPicked((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    )
  }

  return (
    <View className="flex-1 bg-card">
      <ModalHeader
        onCancel={onCancel}
        onSave={() => onDone(picked)}
        saveLabel="Done"
        title="Filter by tag"
      />
      <View className="px-5 pt-4.5">
        <TextField
          label="Search"
          onChangeText={setSearch}
          placeholder="Search tags"
          value={search}
        />
        <View className="mt-3 flex-row items-center justify-between">
          <AppText className="text-xs text-muted-foreground">
            {picked.length ? `${picked.length} selected` : "Pick one or more"}
          </AppText>
          {picked.length > 0 && (
            <Pressable
              accessibilityRole="button"
              className="active:opacity-70"
              onPress={() => setPicked([])}
            >
              <AppText className="font-sans-medium text-xs text-primary">Clear all</AppText>
            </Pressable>
          )}
        </View>
        <SuspenseSection
          errorMessage="Couldn't load your tags."
          fallback={<Skeleton className="mt-3 h-12 w-full" />}
        >
          <TagPickList onToggle={toggle} picked={picked} search={search} />
        </SuspenseSection>
      </View>
    </View>
  )
}

type TagPickListProps = {
  search: string
  picked: string[]
  onToggle: (id: string) => void
}

function TagPickList({ search, picked, onToggle }: TagPickListProps) {
  const { data } = useSuspenseQuery(TAGS)
  const tags = data.tags
    .filter((tag) => tag.tagName.toLowerCase().includes(search.trim().toLowerCase()))
    .sort((a, b) => b.coffeeCount - a.coffeeCount || a.tagName.localeCompare(b.tagName))

  if (!tags.length) {
    return <AppText className="py-4.5 text-sm text-muted-foreground">No tags match.</AppText>
  }

  return tags.map((tag) => {
    const on = picked.includes(tag.id)
    return (
      <ListRow accessibilityState={{ selected: on }} key={tag.id} onPress={() => onToggle(tag.id)}>
        <AppText
          className={on ? "flex-1 font-sans-semibold text-primary" : "flex-1 font-sans-semibold"}
        >
          {tag.tagName}
          {on ? "  ✓" : ""}
        </AppText>
        <AppText className="font-mono text-xs text-muted-foreground">
          {tag.coffeeCount} {tag.coffeeCount === 1 ? "coffee" : "coffees"}
        </AppText>
      </ListRow>
    )
  })
}
