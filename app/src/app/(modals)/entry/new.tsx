import { useMutation } from "@apollo/client/react"
import { View } from "react-native"
import { CAFE, CAFES } from "@/features/cafe/cafe.queries"
import { EntryForm } from "@/features/entry/components/EntryForm/EntryForm"
import { CREATE_ENTRY } from "@/features/entry/entry.mutations"
import { ENTRIES } from "@/features/entry/entry.queries"
import { TAGS } from "@/features/tag/tag.queries"

export default function NewEntryScreen() {
  const [createEntry] = useMutation(CREATE_ENTRY, {
    refetchQueries: [ENTRIES, CAFES, CAFE, TAGS],
  })

  return (
    <View className="flex-1 bg-card">
      <EntryForm
        defaultValues={{
          coffeeName: "",
          cafeId: "",
          rating: 7,
          price: "",
          tagIds: [],
          notes: "",
        }}
        onSave={(values) =>
          createEntry({
            variables: {
              input: {
                ...values,
                rating: values.rating.toFixed(1),
                notes: values.notes || null,
              },
            },
          })
        }
        title="New coffee"
      />
    </View>
  )
}
