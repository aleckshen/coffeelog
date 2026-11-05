import { router } from "expo-router"
import { Pressable } from "react-native"
import { AppText } from "../../primitives/AppText/AppText"

type BackButtonProps = {
  label: string
}

export function BackButton({ label }: BackButtonProps) {
  return (
    <Pressable className="mt-2.5 self-start py-1.5 active:opacity-70" onPress={() => router.back()}>
      <AppText className="font-sans-semibold text-primary">‹ {label}</AppText>
    </Pressable>
  )
}
