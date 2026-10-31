import type { ReactNode } from "react"
import { ScrollView, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { cn } from "@/lib/cn"

type ScreenProps = {
  children: ReactNode
  className?: string
  scroll?: boolean
}

export function Screen({ children, className, scroll = false }: ScreenProps) {
  const insets = useSafeAreaInsets()

  return (
    <View className="flex-1" style={{ paddingTop: insets.top }}>
      {scroll ? (
        <ScrollView contentContainerClassName={cn("px-5 pb-8", className)}>{children}</ScrollView>
      ) : (
        <View className={cn("flex-1 px-5", className)}>{children}</View>
      )}
    </View>
  )
}
