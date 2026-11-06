import { useMutation, useSuspenseQuery } from "@apollo/client/react"
import { router, useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { View } from "react-native"
import { AppText, Button, ConfirmDialog, SuspenseSection } from "@/components"
import { DELETE_CAFE, UPDATE_CAFE } from "@/features/cafe/cafe.mutations"
import { CAFE, CAFES } from "@/features/cafe/cafe.queries"
import { CafeForm } from "@/features/cafe/components/CafeForm/CafeForm"

function EditCafeForm({ id }: { id: string }) {
  const { data } = useSuspenseQuery(CAFE, { variables: { id } })
  const [updateCafe] = useMutation(UPDATE_CAFE)
  const [deleteCafe, { loading: deleting }] = useMutation(DELETE_CAFE, { refetchQueries: [CAFES] })
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteError, setDeleteError] = useState<string>()

  if (!data.cafe) {
    return <AppText className="p-5 text-muted-foreground">Cafe not found.</AppText>
  }

  const cafe = data.cafe
  const count = cafe.coffeeEntries.length

  async function handleDelete() {
    setDeleteError(undefined)
    try {
      await deleteCafe({ variables: { id } })
      setConfirmOpen(false)
      router.dismissTo("/cafes")
    } catch {
      setDeleteError("Couldn't delete the cafe. Try again.")
    }
  }

  return (
    <>
      <CafeForm
        defaultValues={{ cafeName: cafe.cafeName, location: cafe.location }}
        onSave={(values) => updateCafe({ variables: { id, ...values } })}
        title="Edit cafe"
      />
      <View className="px-5 pt-8">
        <Button label="Delete cafe" onPress={() => setConfirmOpen(true)} variant="block" />
      </View>
      <ConfirmDialog
        confirming={deleting}
        confirmLabel="Delete cafe"
        error={deleteError}
        message={
          count
            ? `Its ${count} ${count === 1 ? "coffee" : "coffees"} will be deleted too. This can't be undone.`
            : "This can't be undone."
        }
        onCancel={() => {
          setConfirmOpen(false)
          setDeleteError(undefined)
        }}
        onConfirm={handleDelete}
        title={`Delete ${cafe.cafeName}?`}
        visible={confirmOpen}
      />
    </>
  )
}

export default function EditCafeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <View className="flex-1 bg-card">
      <SuspenseSection errorMessage="Couldn't load this cafe." fallback={null}>
        <EditCafeForm id={id} />
      </SuspenseSection>
    </View>
  )
}
