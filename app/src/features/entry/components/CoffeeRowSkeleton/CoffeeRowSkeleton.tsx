import { View } from "react-native"
import { ListRow, Skeleton } from "@/components"

export function CoffeeRowSkeleton() {
  return (
    <ListRow disabled>
      <Skeleton className="size-12 rounded-full" />
      <View className="flex-1 gap-1">
        <Skeleton className="my-1 h-4 w-36" />
        <Skeleton className="my-1 h-3 w-28" />
      </View>
      <View className="items-end gap-0.5">
        <Skeleton className="my-1 h-5 w-12" />
        <Skeleton className="my-1 h-3 w-12" />
      </View>
    </ListRow>
  )
}
