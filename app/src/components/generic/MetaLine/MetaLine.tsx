import { Fragment } from "react"
import { View } from "react-native"
import { cn } from "@/lib/cn"
import { AppText } from "../../primitives/AppText/AppText"

type MetaLineProps = {
  parts: string[]
  small?: boolean
}

export function MetaLine({ parts, small = false }: MetaLineProps) {
  return (
    <View className="flex-row items-center gap-2">
      {parts.map((part, index) => (
        <Fragment key={part}>
          {index > 0 && (
            <View className={cn("w-px bg-muted-foreground/50", small ? "h-3" : "h-3.5")} />
          )}
          <AppText
            className={cn("shrink text-muted-foreground", small && "text-sm")}
            numberOfLines={1}
          >
            {part}
          </AppText>
        </Fragment>
      ))}
    </View>
  )
}
