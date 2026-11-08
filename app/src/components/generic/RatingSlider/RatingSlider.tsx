import Slider from "@react-native-community/slider"
import { useRef, useState } from "react"
import { TextInput, View } from "react-native"
import { useCSSVariable } from "uniwind"
import { formatRating } from "@/lib/stats"
import { AppText } from "../../primitives/AppText/AppText"

type RatingSliderProps = {
  label: string
  value: number
  onChange: (value: number) => void
}

const toRating = (n: number) => Math.min(10, Math.max(0, Math.round(n * 10) / 10))

export function RatingSlider({ label, value, onChange }: RatingSliderProps) {
  const [primary, border] = useCSSVariable(["--color-primary", "--color-border"]) as string[]
  // While typing, the box shows the raw text; otherwise it shows the current rating.
  const [draft, setDraft] = useState<string | null>(null)
  const input = useRef<TextInput>(null)

  function startEditing() {
    const text = formatRating(value)
    setDraft(text)
    // iOS places the cursor where you tapped; move it to the end so the decimal is easy to change.
    requestAnimationFrame(() => input.current?.setSelection(text.length, text.length))
  }

  function commit() {
    if (draft !== null) {
      const typed = Number(draft)
      if (draft.trim() !== "" && Number.isFinite(typed)) onChange(toRating(typed))
    }
    setDraft(null)
  }

  return (
    <View className="gap-2">
      <AppText className="font-sans-semibold text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </AppText>
      <View className="flex-row items-center gap-3">
        <Slider
          accessibilityLabel={label}
          maximumTrackTintColor={border}
          maximumValue={10}
          minimumTrackTintColor={primary}
          minimumValue={0}
          onValueChange={(next) => onChange(toRating(next))}
          step={0.1}
          style={{ flex: 1 }}
          thumbTintColor={primary}
          value={value}
        />
        <TextInput
          accessibilityLabel={`${label}, out of 10`}
          className="w-18 rounded-xl border border-border bg-background px-2.5 py-2 text-center font-mono-medium text-xl leading-tight text-foreground"
          keyboardType="decimal-pad"
          maxLength={4}
          onBlur={commit}
          onChangeText={setDraft}
          onFocus={startEditing}
          onSubmitEditing={commit}
          ref={input}
          selectionColorClassName="accent-primary"
          value={draft ?? formatRating(value)}
        />
      </View>
    </View>
  )
}
