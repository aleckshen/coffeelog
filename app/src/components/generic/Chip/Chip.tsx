import { View } from "react-native"
import { AppText } from "../../primitives/AppText/AppText"

type ChipProps = {
  label: string
}

export function Chip({ label }: ChipProps) {
  return (
    <View className="rounded-full bg-muted px-2 py-0.5">
      <AppText className="font-sans-medium text-xs text-muted-foreground">{label}</AppText>
    </View>
  )
}
