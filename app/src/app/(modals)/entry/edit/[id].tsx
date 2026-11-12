import { useMutation, useQuery } from "@apollo/client/react"
import { router, useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { View } from "react-native"
import { AppText, Button, ConfirmDialog, ModalHeader } from "@/components"
import { CAFE, CAFES } from "@/features/cafe/cafe.queries"
import { EntryForm } from "@/features/entry/components/EntryForm/EntryForm"
import { DELETE_ENTRY, UPDATE_ENTRY } from "@/features/entry/entry.mutations"
import { ENTRIES, ENTRY } from "@/features/entry/entry.queries"
import { toEntryInput } from "@/features/entry/entry.schema"
import { TAGS } from "@/features/tag/tag.queries"

export default function EditEntryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, loading } = useQuery(ENTRY, { variables: { id } })
  const [updateEntry] = useMutation(UPDATE_ENTRY, {
    refetchQueries: [ENTRY, ENTRIES, CAFES, CAFE, TAGS],
  })
  const [deleteEntry, { loading: deleting }] = useMutation(DELETE_ENTRY, {
    refetchQueries: [ENTRIES, CAFES, CAFE, TAGS],
  })
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteError, setDeleteError] = useState<string>()

  const entry = data?.entry

  if (!entry) {
    return (
      <View className="flex-1 bg-card">
        <ModalHeader title="Edit coffee" />
        {!loading && (
          <AppText className="p-5 text-muted-foreground">Couldn't load this coffee.</AppText>
        )}
      </View>
    )
  }

  async function handleDelete() {
    setDeleteError(undefined)
    try {
      await deleteEntry({ variables: { id } })
      setConfirmOpen(false)
      // Close this sheet, then leave the Coffee screen behind it, since the coffee is gone.
      router.back()
      router.back()
    } catch {
      setDeleteError("Couldn't delete the coffee. Try again.")
    }
  }

  return (
    <View className="flex-1 bg-card">
      <EntryForm
        defaultValues={{
          coffeeName: entry.coffeeName,
          cafeId: entry.cafe.id,
          rating: Number(entry.rating),
          price: entry.price,
          tagIds: entry.tags.map((tag) => tag.id),
          notes: entry.notes ?? "",
        }}
        footer={
          <View className="pt-3.5">
            <Button label="Delete coffee" onPress={() => setConfirmOpen(true)} variant="block" />
          </View>
        }
        onSave={(values) => updateEntry({ variables: { id, input: toEntryInput(values) } })}
        title="Edit coffee"
      />
      <ConfirmDialog
        confirming={deleting}
        confirmLabel="Delete coffee"
        error={deleteError}
        message="This can't be undone."
        onCancel={() => {
          setConfirmOpen(false)
          setDeleteError(undefined)
        }}
        onConfirm={handleDelete}
        title={`Delete "${entry.coffeeName}"?`}
        visible={confirmOpen}
      />
    </View>
  )
}
