import { useEffect } from "react"
import { View } from "react-native"
import Animated, {
  makeMutable,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated"
import { cn } from "@/lib/cn"

const opacity = makeMutable(1)
let pulsing = false

type SkeletonProps = {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  useEffect(() => {
    if (pulsing) return
    pulsing = true
    opacity.value = withRepeat(withTiming(0.5, { duration: 800 }), -1, true)
  }, [])

  const pulse = useAnimatedStyle(() => ({ opacity: opacity.value }))

  return (
    <Animated.View style={pulse}>
      <View className={cn("rounded-md bg-muted", className)} />
    </Animated.View>
  )
}
