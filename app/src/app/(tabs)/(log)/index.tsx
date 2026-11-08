import { useSuspenseQuery } from "@apollo/client/react"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { View } from "react-native"
import { AppText, Screen, Skeleton, StatRow, SuspenseSection } from "@/components"
import { CoffeeRow } from "@/features/entry/components/CoffeeRow/CoffeeRow"
import { CoffeeRowSkeleton } from "@/features/entry/components/CoffeeRowSkeleton/CoffeeRowSkeleton"
import { type CoffeeEntry, ENTRIES } from "@/features/entry/entry.queries"
import { TagFilterBar } from "@/features/tag/components/TagFilterBar/TagFilterBar"
import { TagPickerSheet } from "@/features/tag/components/TagPickerSheet/TagPickerSheet"
import { averageRating, dayLabel, formatPrice, formatRating, totalSpent } from "@/lib/stats"

function groupByDay(entries: CoffeeEntry[]) {
  const groups: { label: string; entries: CoffeeEntry[] }[] = []
  for (const entry of entries) {
    const label = dayLabel(entry.createdAt)
    const last = groups.at(-1)
    if (last?.label === label) last.entries.push(entry)
    else groups.push({ label, entries: [entry] })
  }
  return groups
}

function LogStats() {
  const { data } = useSuspenseQuery(ENTRIES)
  const entries = data.entries

  return (
    <StatRow
      stats={[
        { value: String(entries.length), label: entries.length === 1 ? "Coffee" : "Coffees" },
        { value: formatRating(averageRating(entries)), label: "Avg rating" },
        { value: formatPrice(totalSpent(entries)), label: "Spent" },
      ]}
    />
  )
}

function CoffeeList({ selectedTagIds }: { selectedTagIds: string[] }) {
  const { data } = useSuspenseQuery(ENTRIES)

  if (!data.entries.length) {
    return (
      <AppText className="py-4.5 text-sm text-muted-foreground">
        No coffees yet. Tap + to log your first one.
      </AppText>
    )
  }

  const entries = data.entries.filter((entry) =>
    selectedTagIds.every((id) => entry.tags.some((tag) => tag.id === id)),
  )

  if (!entries.length) {
    return (
      <AppText className="py-4.5 text-sm text-muted-foreground">
        {selectedTagIds.length === 1
          ? "No coffees have this tag yet."
          : "No coffees have all of these tags yet."}
      </AppText>
    )
  }

  return groupByDay(entries).map((group) => (
    <View key={group.label}>
      <AppText className="mt-5 mb-1.5 font-sans-semibold text-xs uppercase tracking-widest text-muted-foreground">
        {group.label}
      </AppText>
      {group.entries.map((entry) => (
        <CoffeeRow
          entry={entry}
          key={entry.id}
          subtitle={[entry.cafe.cafeName, entry.cafe.location]}
        />
      ))}
    </View>
  ))
}

export default function LogScreen() {
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])
  const [sheetOpen, setSheetOpen] = useState(false)
  const { tag } = useLocalSearchParams<{ tag?: string }>()

  useEffect(() => {
    if (!tag) return
    setSelectedTagIds([tag])
    router.setParams({ tag: undefined })
  }, [tag])

  return (
    <Screen scroll>
      <AppText className="mt-2.5 font-serif text-3xl">
        [ coffee<AppText className="font-serif text-3xl text-primary">log</AppText> ]
      </AppText>
      <SuspenseSection
        errorMessage="Couldn't load your coffees."
        fallback={
          <View className="mt-4.5">
            <Skeleton className="h-18 w-full" />
            <Skeleton className="mt-5 h-8 w-32 rounded-full" />
            <View className="mt-5">
              <CoffeeRowSkeleton />
              <CoffeeRowSkeleton />
              <CoffeeRowSkeleton />
            </View>
          </View>
        }
      >
        <View className="mt-4.5">
          <LogStats />
          <TagFilterBar
            onOpen={() => setSheetOpen(true)}
            onRemove={(id) => setSelectedTagIds((ids) => ids.filter((x) => x !== id))}
            selectedTagIds={selectedTagIds}
          />
          <CoffeeList selectedTagIds={selectedTagIds} />
        </View>
      </SuspenseSection>
      <TagPickerSheet
        onCancel={() => setSheetOpen(false)}
        onDone={(ids) => {
          setSelectedTagIds(ids)
          setSheetOpen(false)
        }}
        selectedTagIds={selectedTagIds}
        title="Filter by tag"
        visible={sheetOpen}
      />
    </Screen>
  )
}
