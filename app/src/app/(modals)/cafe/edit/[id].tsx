import { useMutation, useSuspenseQuery } from "@apollo/client/react"
import { useLocalSearchParams } from "expo-router"
import { View } from "react-native"
import { AppText, SuspenseSection } from "@/components"
import { UPDATE_CAFE } from "@/features/cafe/cafe.mutations"
import { CAFE } from "@/features/cafe/cafe.queries"
import { CafeForm } from "@/features/cafe/components/CafeForm/CafeForm"

function EditCafeForm({ id }: { id: string }) {
  const { data } = useSuspenseQuery(CAFE, { variables: { id } })
  const [updateCafe] = useMutation(UPDATE_CAFE)

  if (!data.cafe) {
    return <AppText className="p-5 text-muted-foreground">Cafe not found.</AppText>
  }

  return (
    <CafeForm
      defaultValues={{ cafeName: data.cafe.cafeName, location: data.cafe.location }}
      onSave={(values) => updateCafe({ variables: { id, ...values } })}
      title="Edit cafe"
    />
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
