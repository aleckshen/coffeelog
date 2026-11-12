import { useQuery } from "@apollo/client/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { router } from "expo-router"
import { type ReactNode, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { ScrollView, View } from "react-native"
import { AppText, Chip, ModalHeader, RatingSlider, SelectField, TextField } from "@/components"
import { CAFES } from "@/features/cafe/cafe.queries"
import { CafePickerSheet } from "@/features/cafe/components/CafePickerSheet/CafePickerSheet"
import { type EntryFormValues, entrySchema } from "@/features/entry/entry.schema"
import { TagPickerSheet } from "@/features/tag/components/TagPickerSheet/TagPickerSheet"
import { TAGS } from "@/features/tag/tag.queries"

type EntryFormProps = {
  title: string
  defaultValues: EntryFormValues
  onSave: (values: EntryFormValues) => Promise<unknown>
  footer?: ReactNode
}

export function EntryForm({ title, defaultValues, onSave, footer }: EntryFormProps) {
  const { control, handleSubmit, setError, formState } = useForm<EntryFormValues>({
    resolver: zodResolver(entrySchema),
    defaultValues,
  })
  const { data: cafeData } = useQuery(CAFES)
  const { data: tagData } = useQuery(TAGS)
  const [cafeSheetOpen, setCafeSheetOpen] = useState(false)
  const [tagSheetOpen, setTagSheetOpen] = useState(false)

  const submit = handleSubmit(async (values) => {
    try {
      await onSave(values)
      router.back()
    } catch {
      setError("root", { message: "Couldn't save the coffee. Try again." })
    }
  })

  return (
    <View className="flex-1">
      <ModalHeader onSave={submit} saving={formState.isSubmitting} title={title} />
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerClassName="gap-4.5 px-5 pt-4.5 pb-10"
        keyboardShouldPersistTaps="handled"
      >
        <Controller
          control={control}
          name="coffeeName"
          render={({ field, fieldState }) => (
            <TextField
              error={fieldState.error?.message}
              label="Coffee name"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              placeholder="e.g. Flat white"
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="cafeId"
          render={({ field, fieldState }) => {
            const cafe = cafeData?.cafes.find((c) => c.id === field.value)
            return (
              <>
                <SelectField
                  error={fieldState.error?.message}
                  label="Cafe"
                  onPress={() => setCafeSheetOpen(true)}
                  placeholder="Choose a cafe"
                  value={cafe && [cafe.cafeName, cafe.location]}
                />
                <CafePickerSheet
                  onCancel={() => setCafeSheetOpen(false)}
                  onPick={(id) => {
                    field.onChange(id)
                    setCafeSheetOpen(false)
                  }}
                  selectedCafeId={field.value}
                  visible={cafeSheetOpen}
                />
              </>
            )
          }}
        />
        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <RatingSlider label="Rating" onChange={field.onChange} value={field.value} />
          )}
        />
        <Controller
          control={control}
          name="price"
          render={({ field, fieldState }) => (
            <TextField
              error={fieldState.error?.message}
              keyboardType="decimal-pad"
              label="Price"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              placeholder="e.g. 5.20"
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="tagIds"
          render={({ field }) => {
            const tags = (tagData?.tags ?? []).filter((tag) => field.value.includes(tag.id))
            return (
              <View className="gap-2.5">
                <SelectField
                  label="Tags"
                  onPress={() => setTagSheetOpen(true)}
                  placeholder="Choose tags"
                  value={
                    tags.length
                      ? [`${tags.length} ${tags.length === 1 ? "tag" : "tags"}`]
                      : undefined
                  }
                />
                {tags.length > 0 && (
                  <View className="flex-row flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <Chip key={tag.id} label={tag.tagName} />
                    ))}
                  </View>
                )}
                <TagPickerSheet
                  onCancel={() => setTagSheetOpen(false)}
                  onDone={(ids) => {
                    field.onChange(ids)
                    setTagSheetOpen(false)
                  }}
                  selectedTagIds={field.value}
                  title="Choose tags"
                  visible={tagSheetOpen}
                />
              </View>
            )
          }}
        />
        <Controller
          control={control}
          name="notes"
          render={({ field }) => (
            <TextField
              className="min-h-24"
              label="Notes"
              multiline
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              placeholder="Optional"
              textAlignVertical="top"
              value={field.value}
            />
          )}
        />
        {formState.errors.root && (
          <AppText className="text-xs text-destructive">{formState.errors.root.message}</AppText>
        )}
        {footer}
      </ScrollView>
    </View>
  )
}
