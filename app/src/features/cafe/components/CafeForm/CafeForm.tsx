import { zodResolver } from "@hookform/resolvers/zod"
import { router } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { AppText, ModalHeader, TextField } from "@/components"
import { type CafeFormValues, cafeSchema } from "@/features/cafe/cafe.schema"

export type CafeFormProps = {
  title: string
  defaultValues: CafeFormValues
  onSave: (values: CafeFormValues) => Promise<unknown>
}

export function CafeForm({ title, defaultValues, onSave }: CafeFormProps) {
  const { control, handleSubmit, setError, formState } = useForm<CafeFormValues>({
    resolver: zodResolver(cafeSchema),
    defaultValues,
  })

  const submit = handleSubmit(async (values) => {
    try {
      await onSave(values)
      router.back()
    } catch {
      setError("root", { message: "Couldn't save the cafe. Try again." })
    }
  })

  return (
    <View>
      <ModalHeader onSave={submit} saving={formState.isSubmitting} title={title} />
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
