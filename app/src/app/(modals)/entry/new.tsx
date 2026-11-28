import { useMutation } from "@apollo/client/react"
import { View } from "react-native"
import { CAFE, CAFES } from "@/features/cafe/cafe.queries"
import { EntryForm } from "@/features/entry/components/EntryForm/EntryForm"
import { CREATE_ENTRY } from "@/features/entry/entry.mutations"
import { ENTRIES } from "@/features/entry/entry.queries"
import { toEntryInput } from "@/features/entry/entry.schema"
import { useUploadPhoto } from "@/features/entry/useUploadPhoto"
import { TAGS } from "@/features/tag/tag.queries"

export default function NewEntryScreen() {
  const [createEntry] = useMutation(CREATE_ENTRY, {
    refetchQueries: [ENTRIES, CAFES, CAFE, TAGS],
  })

  const toPhotoKey = useUploadPhoto()

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
          photo: null,
        }}
        onSave={async (values) => {
          const photoKey = await toPhotoKey(values.photo)
          return createEntry({ variables: { input: { ...toEntryInput(values), photoKey } } })
        }}
        title="New coffee"
      />
    </View>
  )
}
