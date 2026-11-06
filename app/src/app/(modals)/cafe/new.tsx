import { useMutation } from "@apollo/client/react"
import { CREATE_CAFE } from "@/features/cafe/cafe.mutations"
import { CAFES } from "@/features/cafe/cafe.queries"
import { CafeForm } from "@/features/cafe/components/CafeForm/CafeForm"

export default function NewCafeScreen() {
  const [createCafe] = useMutation(CREATE_CAFE, { refetchQueries: [CAFES] })

  return (
    <CafeForm
      defaultValues={{ cafeName: "", location: "" }}
      onSave={(values) => createCafe({ variables: values })}
      title="New cafe"
    />
  )
}
