import { useSuspenseQuery } from "@apollo/client/react"
import { useLocalSearchParams } from "expo-router"
import { View } from "react-native"
import { AppText, BackButton, Screen, Skeleton, SuspenseSection } from "@/components"
import { CAFE } from "@/features/cafe/cafe.queries"

function CafeDetails({ id }: { id: string }) {
  const { data } = useSuspenseQuery(CAFE, { variables: { id } })

  if (!data.cafe) {
    return <AppText className="text-muted-foreground">Cafe not found.</AppText>
  }

  return (
    <View>
      <AppText className="mt-2 font-serif text-3xl">{data.cafe.cafeName}</AppText>
      <AppText className="text-muted-foreground">{data.cafe.location}</AppText>
    </View>
  )
}

function CafeDetailsSkeleton() {
  return (
    <View className="mt-2 gap-2">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-32" />
    </View>
  )
}

export default function CafeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <Screen>
      <BackButton label="Cafes" />
      <SuspenseSection errorMessage="Couldn't load this cafe." fallback={<CafeDetailsSkeleton />}>
        <CafeDetails id={id} />
      </SuspenseSection>
    </Screen>
  )
}
