import { type ReactNode, Suspense } from "react"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

type AnimatedSuspenseProps = {
  children: ReactNode
  fallback: ReactNode
}

export function AnimatedSuspense({ children, fallback }: AnimatedSuspenseProps) {
  return (
    <Suspense fallback={<Animated.View exiting={FadeOut.duration(150)}>{fallback}</Animated.View>}>
      <Animated.View entering={FadeIn.duration(200)}>{children}</Animated.View>
    </Suspense>
  )
}
