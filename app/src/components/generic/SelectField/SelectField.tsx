import { ChevronRight } from "lucide-react-native"
import { Pressable, View } from "react-native"
import { useCSSVariable } from "uniwind"
import { AppText } from "../../primitives/AppText/AppText"
import { MetaLine } from "../MetaLine/MetaLine"

type SelectFieldProps = {
  label: string
  placeholder: string
  value?: string[]
  onPress: () => void
  error?: string
}

export function SelectField({ label, placeholder, value, onPress, error }: SelectFieldProps) {
  const muted = useCSSVariable("--color-muted-foreground") as string

  return (
    <View className="gap-2">
      <AppText className="font-sans-semibold text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </AppText>
      <Pressable
        accessibilityLabel={label}
        accessibilityRole="button"
        className="flex-row items-center justify-between gap-3 rounded-xl border border-border bg-background p-3 active:opacity-70"
        onPress={onPress}
      >
        <View className="shrink">
          {value?.length ? (
            <MetaLine parts={value} />
          ) : (
            <AppText className="leading-tight text-muted-foreground">{placeholder}</AppText>
          )}
        </View>
        <ChevronRight color={muted} size={18} strokeWidth={2} />
      </Pressable>
      {error && <AppText className="text-xs text-destructive">{error}</AppText>}
    </View>
  )
}
