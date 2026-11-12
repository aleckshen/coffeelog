import { useSuspenseQuery } from "@apollo/client/react"
import { router, useLocalSearchParams } from "expo-router"
import { View } from "react-native"
import {
  AppText,
  BackButton,
  Button,
  Screen,
  Skeleton,
  StatRow,
  SuspenseSection,
} from "@/components"
import { CAFE } from "@/features/cafe/cafe.queries"
import { CoffeeRow } from "@/features/entry/components/CoffeeRow/CoffeeRow"
import { averageRating, dayLabel, formatPrice, formatRating, totalSpent } from "@/lib/stats"

function CafeDetails({ id }: { id: string }) {
  const { data } = useSuspenseQuery(CAFE, { variables: { id } })

  if (!data.cafe) {
    return <AppText className="text-muted-foreground">Cafe not found.</AppText>
  }

  const entries = data.cafe.coffeeEntries
  const count = entries.length

  return (
    <View>
      <AppText className="mt-6.5 font-serif text-3xl">{data.cafe.cafeName}</AppText>
      <AppText className="text-muted-foreground">{data.cafe.location}</AppText>
      <View className="mt-4.5">
        <StatRow
          stats={[
            { value: String(count), label: count === 1 ? "Coffee" : "Coffees" },
            { value: formatRating(averageRating(entries)), label: "Avg rating" },
            { value: formatPrice(totalSpent(entries)), label: "Spent" },
          ]}
        />
      </View>
      <AppText className="mt-5 mb-1.5 font-sans-semibold text-xs uppercase tracking-widest text-muted-foreground">
        Coffees here
      </AppText>
      {entries.length ? (
        entries.map((entry) => (
          <CoffeeRow entry={entry} key={entry.id} subtitle={[dayLabel(entry.createdAt)]} />
        ))
      ) : (
        <AppText className="py-4.5 text-sm text-muted-foreground">
          No coffees logged here yet. Tap + to log one.
        </AppText>
      )}
    </View>
  )
}

function CafeDetailsSkeleton() {
  return (
    <View className="mt-6.5">
      <Skeleton className="my-0.5 h-8 w-48" />
      <Skeleton className="my-1 h-4 w-32" />
      <Skeleton className="mt-4.5 h-18 w-full" />
    </View>
  )
}

export default function CafeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <Screen scroll>
      <View className="flex-row items-center justify-between">
        <BackButton label="cafes" />
        <Button
          label="Edit"
          onPress={() => router.push({ pathname: "/cafe/edit/[id]", params: { id } })}
        />
      </View>

      <SuspenseSection errorMessage="Couldn't load this cafe." fallback={<CafeDetailsSkeleton />}>
        <CafeDetails id={id} />
      </SuspenseSection>
    </Screen>
  )
}
