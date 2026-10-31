import { Text, type TextProps } from "react-native"
import { cn } from "@/lib/cn"

export function AppText({ className, ...props }: TextProps) {
  return <Text className={cn("font-sans text-base text-foreground", className)} {...props} />
}
