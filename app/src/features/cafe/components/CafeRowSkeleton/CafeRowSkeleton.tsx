import { View } from "react-native"
import { ListRow, Skeleton } from "@/components"

export function CafeRowSkeleton() {
  return (
    <ListRow disabled>
      <View className="flex-1 gap-1">
        <Skeleton className="my-1 h-4 w-32" />
        <Skeleton className="my-1 h-3 w-20" />
      </View>
      <View className="items-end gap-1.5">
        <Skeleton className="h-5 w-8" />
        <Skeleton className="h-3 w-14" />
      </View>
    </ListRow>
  )
}
