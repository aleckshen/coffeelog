import { useEffect } from "react"
import { View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"
import { cn } from "@/lib/cn"

type SkeletonProps = {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  const opacity = useSharedValue(1)

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.5, { duration: 800 }), -1, true)
  }, [opacity])

  const pulse = useAnimatedStyle(() => ({ opacity: opacity.value }))

  return (
    <Animated.View style={pulse}>
      <View className={cn("rounded-md bg-muted", className)} />
    </Animated.View>
  )
}
