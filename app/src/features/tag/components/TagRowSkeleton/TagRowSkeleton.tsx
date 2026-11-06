import { View } from "react-native"
import { ListRow, Skeleton } from "@/components"

export function TagRowSkeleton() {
  return (
    <ListRow disabled>
      <View className="flex-1">
        <Skeleton className="my-1 h-4 w-24" />
      </View>
      <Skeleton className="my-1 h-3 w-14" />
    </ListRow>
  )
}
