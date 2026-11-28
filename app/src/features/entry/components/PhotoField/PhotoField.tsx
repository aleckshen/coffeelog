import { Image } from "expo-image"
import { ImageManipulator, SaveFormat } from "expo-image-manipulator"
import * as ImagePicker from "expo-image-picker"
import { ImagePlus } from "lucide-react-native"
import { useState } from "react"
import { Pressable, View } from "react-native"
import { useCSSVariable } from "uniwind"
import { AppText, Button } from "@/components"

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
        <View className="gap-2.5">
          <View className="h-56 overflow-hidden rounded-xl bg-muted">
            <Image
              contentFit="cover"
              source={{ uri: value }}
              style={{ flex: 1 }}
              transition={150}
            />
          </View>
          <View className="flex-row gap-2">
            <Button disabled={preparing} label="Change" onPress={pickPhoto} />
            <Button disabled={preparing} label="Remove" onPress={() => onChange(null)} />
          </View>
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
