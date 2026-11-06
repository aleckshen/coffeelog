import { useMutation } from "@apollo/client/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { router } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { AppText, ModalHeader, TextField } from "@/components"
import { CREATE_TAG } from "@/features/tag/tag.mutations"
import { TAGS } from "@/features/tag/tag.queries"
import { type TagFormValues, tagSchema } from "@/features/tag/tag.schema"

export default function NewTagScreen() {
  const { control, handleSubmit, setError, formState } = useForm<TagFormValues>({
    resolver: zodResolver(tagSchema),
    defaultValues: { tagName: "" },
  })
  const [createTag, { loading }] = useMutation(CREATE_TAG, { refetchQueries: [TAGS] })

  const onSave = handleSubmit(async (values) => {
    try {
      await createTag({ variables: values })
      router.back()
    } catch {
      setError("root", { message: "Couldn't save the tag. Try again." })
    }
  })

  return (
    <View className="flex-1 bg-card">
      <ModalHeader onSave={onSave} saving={loading} title="New tag" />
      <View className="gap-4.5 px-5 pt-4.5">
        <Controller
          control={control}
          name="tagName"
          render={({ field, fieldState }) => (
            <TextField
              error={fieldState.error?.message}
              label="Tag name"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              placeholder="e.g. fruity"
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
