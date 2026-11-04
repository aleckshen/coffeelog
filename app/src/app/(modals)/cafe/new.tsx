import { useMutation } from "@apollo/client/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { router } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { AppText, ModalHeader, TextField } from "@/components"
import { CREATE_CAFE } from "@/features/cafe/cafe.mutations"
import { CAFES } from "@/features/cafe/cafe.queries"
import { type CafeFormValues, cafeSchema } from "@/features/cafe/cafe.schema"

export default function NewCafeScreen() {
  const { control, handleSubmit, setError, formState } = useForm<CafeFormValues>({
    resolver: zodResolver(cafeSchema),
    defaultValues: { cafeName: "", location: "" },
  })
  const [createCafe, { loading }] = useMutation(CREATE_CAFE, { refetchQueries: [CAFES] })

  const onSave = handleSubmit(async (values) => {
    try {
      await createCafe({ variables: values })
      router.back()
    } catch {
      setError("root", { message: "Couldn't save the cafe. Try again." })
    }
  })

  return (
    <View className="flex-1 bg-card">
      <ModalHeader onSave={onSave} saving={loading} title="New cafe" />
      <View className="gap-4.5 px-5 pt-4.5">
        <Controller
          control={control}
          name="cafeName"
          render={({ field, fieldState }) => (
            <TextField
              error={fieldState.error?.message}
              label="Cafe name"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              placeholder="e.g. Holiday"
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="location"
          render={({ field, fieldState }) => (
            <TextField
              error={fieldState.error?.message}
              label="Location"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              placeholder="e.g. Mt Eden, Auckland"
              value={field.value}
            />
          )}
        />
        {formState.errors.root && (
          <AppText className="text-xs text-destructive">{formState.errors.root.message}</AppText>
        )}
      </View>
    </View>
  )
}
