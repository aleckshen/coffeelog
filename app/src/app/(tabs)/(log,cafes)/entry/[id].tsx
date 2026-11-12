import { useSuspenseQuery } from "@apollo/client/react"
import { router, useLocalSearchParams, useSegments } from "expo-router"
import type { ReactNode } from "react"
import { View } from "react-native"
import {
  AppText,
  BackButton,
  Button,
  Chip,
  MetaLine,
  Screen,
  Skeleton,
  StatRow,
  SuspenseSection,
} from "@/components"
import { ENTRY } from "@/features/entry/entry.queries"
import { formatPrice, formatRating, formatWhen } from "@/lib/stats"

function CoffeeDetails({ id }: { id: string }) {
  const { data } = useSuspenseQuery(ENTRY, { variables: { id } })

  if (!data.entry) {
    return <AppText className="mt-6.5 text-muted-foreground">Coffee not found.</AppText>
  }

  const entry = data.entry

  return (
    <View>
      <AppText className="mt-6.5 font-serif text-3xl">{entry.coffeeName}</AppText>
      <MetaLine parts={[entry.cafe.cafeName, entry.cafe.location]} />
      <AppText className="text-sm text-muted-foreground">{formatWhen(entry.createdAt)}</AppText>
      <View className="mt-4.5">
        <StatRow
          stats={[
            { value: `${formatRating(Number(entry.rating))}/10`, label: "Rating" },
            { value: formatPrice(Number(entry.price)), label: "Price" },
          ]}
        />
      </View>
      <Section label="Tags">
        {entry.tags.length ? (
          <View className="flex-row flex-wrap gap-1.5">
            {entry.tags.map((tag) => (
              <Chip key={tag.id} label={tag.tagName} />
            ))}
          </View>
        ) : (
          <AppText className="text-muted-foreground">No tags.</AppText>
        )}
      </Section>
      <Section label="Notes">
        <AppText className={entry.notes ? undefined : "text-muted-foreground"}>
          {entry.notes || "No notes."}
        </AppText>
      </Section>
    </View>
  )
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View className="mt-5 gap-2">
      <AppText className="font-sans-semibold text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </AppText>
      {children}
    </View>
  )
}

function CoffeeDetailsSkeleton() {
  return (
    <View className="mt-6.5">
      <Skeleton className="my-0.5 h-8 w-56" />
      <Skeleton className="my-1 h-4 w-40" />
      <Skeleton className="my-1 h-3 w-32" />
      <Skeleton className="mt-4.5 h-18 w-full" />
    </View>
  )
}

export default function CoffeeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const segments = useSegments()
  const fromCafes = segments[1] === "(cafes)"

  return (
    <Screen scroll>
      <View className="flex-row items-center justify-between">
        <BackButton label={fromCafes ? "cafe" : "log"} />
        <Button
          label="Edit"
          onPress={() => router.push({ pathname: "/entry/edit/[id]", params: { id } })}
        />
      </View>
      <SuspenseSection
        errorMessage="Couldn't load this coffee."
        fallback={<CoffeeDetailsSkeleton />}
      >
        <CoffeeDetails id={id} />
      </SuspenseSection>
    </Screen>
  )
}
