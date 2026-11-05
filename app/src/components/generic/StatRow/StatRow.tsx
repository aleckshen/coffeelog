import { View } from "react-native"
import { cn } from "@/lib/cn"
import { AppText } from "../../primitives/AppText/AppText"

type Stat = {
  value: string
  label: string
}

type StatRowProps = {
  stats: Stat[]
}

export function StatRow({ stats }: StatRowProps) {
  return (
    <View className="flex-row border-y border-border">
      {stats.map((stat, index) => (
        <View
          className={cn("flex-1 gap-0.5 py-3", index > 0 && "border-l border-border pl-3.5")}
          key={stat.label}
        >
          <AppText className="font-mono-medium text-xl">{stat.value}</AppText>
          <AppText className="text-xs uppercase tracking-wider text-muted-foreground">
            {stat.label}
          </AppText>
        </View>
      ))}
    </View>
  )
}
