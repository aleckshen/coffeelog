import { router } from "expo-router"
import { Pressable, View } from "react-native"
import { AppText } from "@/components/primitives/AppText/AppText"

type ModalHeaderProps = {
  title: string
}

export function ModalHeader({ title }: ModalHeaderProps) {
  return (
    <View className="flex-row items-center border-b border-border px-5 pt-4 pb-2.5">
      <View className="flex-1 items-start">
        <Pressable
          accessibilityRole="button"
          className="py-1.5 active:opacity-70"
          onPress={() => router.back()}
        >
          <AppText className="font-sans-semibold text-[15px] text-muted-foreground">Cancel</AppText>
        </Pressable>
      </View>
      <AppText className="font-serif text-xl">{title}</AppText>
      <View className="flex-1" />
    </View>
  )
}
