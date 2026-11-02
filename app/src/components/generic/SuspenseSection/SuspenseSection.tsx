import type { ReactNode } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { AnimatedSuspense } from "../AnimatedSuspense/AnimatedSuspense"
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"

type SuspenseSectionProps = {
  children: ReactNode
  fallback: ReactNode
  errorMessage: string
}

export function SuspenseSection({ children, fallback, errorMessage }: SuspenseSectionProps) {
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => (
        <ErrorMessage message={errorMessage} onRetry={resetErrorBoundary} />
      )}
    >
      <AnimatedSuspense fallback={fallback}>{children}</AnimatedSuspense>
    </ErrorBoundary>
  )
}
