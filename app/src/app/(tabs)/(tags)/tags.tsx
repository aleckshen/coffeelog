import { useMutation, useSuspenseQuery } from "@apollo/client/react"
import { router } from "expo-router"
import { useState } from "react"
import { View } from "react-native"
import { AppText, Button, ConfirmDialog, Screen, SuspenseSection } from "@/components"
import { TagRow } from "@/features/tag/components/TagRow/TagRow"
import { TagRowSkeleton } from "@/features/tag/components/TagRowSkeleton/TagRowSkeleton"
import { DELETE_TAG } from "@/features/tag/tag.mutations"
import { TAGS, type Tag } from "@/features/tag/tag.queries"

function TagsList() {
  const { data } = useSuspenseQuery(TAGS)
  const [deleteTag, { loading: deleting }] = useMutation(DELETE_TAG, { refetchQueries: [TAGS] })
  const [tagToDelete, setTagToDelete] = useState<Tag | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteError, setDeleteError] = useState<string>()

  function openDialog(tag: Tag) {
    setTagToDelete(tag)
    setDialogOpen(true)
  }

  function closeDialog() {
    setDialogOpen(false)
    setDeleteError(undefined)
  }

  async function handleDelete() {
    if (!tagToDelete) return
    setDeleteError(undefined)
    try {
      await deleteTag({ variables: { id: tagToDelete.id } })
      closeDialog()
    } catch {
      setDeleteError("Couldn't delete the tag. Try again.")
    }
  }

  const count = tagToDelete?.coffeeCount ?? 0

  return (
    <View>
      {data.tags.map((tag) => (
        <TagRow
          key={tag.id}
          onDelete={() => openDialog(tag)}
          onPress={() => router.navigate({ pathname: "/", params: { tag: tag.id } })}
          tag={tag}
        />
      ))}
      <ConfirmDialog
        confirming={deleting}
        confirmLabel="Delete tag"
        error={deleteError}
        message={
          count
            ? `It will be removed from ${count} ${count === 1 ? "coffee" : "coffees"}. The coffees stay.`
            : "This can't be undone."
        }
        onCancel={closeDialog}
        onConfirm={handleDelete}
        title={`Delete "${tagToDelete?.tagName}"?`}
        visible={dialogOpen}
      />
    </View>
  )
}

export default function TagsScreen() {
  return (
    <Screen scroll>
      <View className="mt-2.5 mb-4 flex-row items-center justify-between">
        <AppText className="font-serif text-3xl">[ tags ]</AppText>
        <Button label="Add tag" onPress={() => router.push("/tag/new")} />
      </View>
      <AppText className="mb-4.5 text-sm text-muted-foreground">
        Your own labels that attach to any number of coffee entries. Tap on one to filter the log.
      </AppText>
      <SuspenseSection
        errorMessage="Couldn't load your tags."
        fallback={
          <View>
            <TagRowSkeleton />
            <TagRowSkeleton />
            <TagRowSkeleton />
          </View>
        }
      >
        <TagsList />
      </SuspenseSection>
    </Screen>
  )
}
