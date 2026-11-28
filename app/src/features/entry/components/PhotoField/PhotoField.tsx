import { Image } from "expo-image"
import { ImageManipulator, SaveFormat } from "expo-image-manipulator"
import * as ImagePicker from "expo-image-picker"
import { ImagePlus, X } from "lucide-react-native"
import { useState } from "react"
import { Pressable, View } from "react-native"
import { useCSSVariable } from "uniwind"
import { AppText } from "@/components"

const MAX_WIDTH = 1600

type PhotoFieldProps = {
  value: string | null
  onChange: (uri: string | null) => void
}

export function PhotoField({ value, onChange }: PhotoFieldProps) {
  const [preparing, setPreparing] = useState(false)
  const muted = useCSSVariable("--color-muted-foreground") as string

  async function pickPhoto() {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"] })
    if (result.canceled) return
    const asset = result.assets[0]

    setPreparing(true)
    try {
      const context = ImageManipulator.manipulate(asset.uri)
      if (asset.width > MAX_WIDTH) context.resize({ width: MAX_WIDTH })
      const image = await context.renderAsync()
      const saved = await image.saveAsync({ compress: 0.8, format: SaveFormat.JPEG })
      onChange(saved.uri)
    } finally {
      setPreparing(false)
    }
  }

  return (
    <View className="gap-2">
      <AppText className="font-sans-semibold text-xs uppercase tracking-wider text-muted-foreground">
        Photo
      </AppText>
      {value ? (
        <View>
          <Pressable
            accessibilityLabel="Change photo"
            accessibilityRole="button"
            className="h-56 overflow-hidden rounded-xl bg-muted active:opacity-80 disabled:opacity-50"
            disabled={preparing}
            onPress={pickPhoto}
          >
            <Image
              contentFit="cover"
              source={{ uri: value }}
              style={{ flex: 1 }}
              transition={150}
            />
          </Pressable>
          <Pressable
            accessibilityLabel="Remove photo"
            accessibilityRole="button"
            className="absolute top-2.5 right-2.5 size-8 items-center justify-center rounded-full bg-black/55 active:opacity-70"
            disabled={preparing}
            hitSlop={8}
            onPress={() => onChange(null)}
          >
            <X color="white" size={16} strokeWidth={2.2} />
          </Pressable>
        </View>
      ) : (
        <Pressable
          accessibilityLabel="Add photo"
          accessibilityRole="button"
          className="h-32 items-center justify-center gap-1.5 rounded-xl border border-dashed border-border bg-background active:opacity-70 disabled:opacity-50"
          disabled={preparing}
          onPress={pickPhoto}
        >
          <ImagePlus color={muted} size={22} strokeWidth={1.7} />
          <AppText className="text-sm text-muted-foreground">
            {preparing ? "Preparing photo…" : "Add photo"}
          </AppText>
        </Pressable>
      )}
    </View>
  )
}
