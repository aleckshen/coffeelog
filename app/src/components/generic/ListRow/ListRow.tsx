import { Pressable, type PressableProps } from "react-native"
import { cn } from "@/lib/cn"

export function ListRow({ className, ...props }: PressableProps) {
  return (
    <Pressable
      className={cn(
        "flex-row items-center gap-3 border-b border-border py-3.5 active:opacity-70",
        className,
      )}
      {...props}
    />
  )
}
