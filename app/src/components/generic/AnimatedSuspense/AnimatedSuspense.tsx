import { type ReactNode, type RefObject, Suspense, useEffect, useRef, useState } from "react"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

const SKELETON_DELAY = 300
const SKELETON_MIN_DURATION = 500

type AnimatedSuspenseProps = {
  children: ReactNode
  fallback: ReactNode
}

type ShownAt = RefObject<number | null>

// Fast loads skip the skeleton entirely instead of flashing it.
function DelayedFallback({ children, shownAt }: { children: ReactNode; shownAt: ShownAt }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      shownAt.current = Date.now()
      setShow(true)
    }, SKELETON_DELAY)
    return () => clearTimeout(timer)
  }, [shownAt])

  return show ? children : null
}

// Once the skeleton has appeared, keep it up long enough to not read as a flash,
// even if the data arrives right after.
function MinDuration({
  children,
  fallback,
  shownAt,
}: AnimatedSuspenseProps & { shownAt: ShownAt }) {
  const [holding, setHolding] = useState(shownAt.current !== null)

  useEffect(() => {
    if (!holding || shownAt.current === null) return
    const remaining = SKELETON_MIN_DURATION - (Date.now() - shownAt.current)
    const timer = setTimeout(() => setHolding(false), Math.max(0, remaining))
    return () => clearTimeout(timer)
  }, [holding, shownAt])

  if (holding) {
    return (
      <Animated.View exiting={FadeOut.duration(150)} key="fallback">
        {fallback}
      </Animated.View>
    )
  }

  return (
    <Animated.View entering={FadeIn.duration(200)} key="content">
      {children}
    </Animated.View>
  )
}

export function AnimatedSuspense({ children, fallback }: AnimatedSuspenseProps) {
  const shownAt = useRef<number | null>(null)

  return (
    <Suspense fallback={<DelayedFallback shownAt={shownAt}>{fallback}</DelayedFallback>}>
      <MinDuration fallback={fallback} shownAt={shownAt}>
        {children}
      </MinDuration>
    </Suspense>
  )
}
