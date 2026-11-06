import { Pressable, type PressableProps } from "react-native"
import { AppText } from "@/components/primitives/AppText/AppText"
import { cn } from "@/lib/cn"

const variants = {
  pill: {
    container: "rounded-full border border-primary px-3.5 py-1.5",
    label: "font-sans-semibold text-sm text-primary",
  },
  block: {
    container: "items-center rounded-xl border border-border py-3.5",
    label: "font-sans-semibold text-base text-primary",
  },
}

type ButtonProps = PressableProps & {
  label: string
  variant?: keyof typeof variants
}

export function Button({ label, variant = "pill", className, ...props }: ButtonProps) {
  const styles = variants[variant]

  return (
    <Pressable
      accessibilityRole="button"
      className={cn("active:opacity-70", styles.container, className)}
      {...props}
    >
      <AppText className={styles.label}>{label}</AppText>
    </Pressable>
  )
}
