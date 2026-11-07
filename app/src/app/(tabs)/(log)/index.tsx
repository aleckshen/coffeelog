import { useSuspenseQuery } from "@apollo/client/react"
import { View } from "react-native"
import { AppText, Screen, SuspenseSection } from "@/components"
import { CoffeeRow } from "@/features/entry/components/CoffeeRow/CoffeeRow"
import { CoffeeRowSkeleton } from "@/features/entry/components/CoffeeRowSkeleton/CoffeeRowSkeleton"
import { type CoffeeEntry, ENTRIES } from "@/features/entry/entry.queries"
import { dayLabel } from "@/lib/stats"

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

function CoffeeList() {
  const { data } = useSuspenseQuery(ENTRIES)

  if (!data.entries.length) {
    return (
      <AppText className="py-4.5 text-sm text-muted-foreground">
        No coffees yet. Tap + to log your first one.
      </AppText>
    )
  }

  return groupByDay(data.entries).map((group) => (
    <View key={group.label}>
      <AppText className="mt-5 mb-1.5 font-sans-semibold text-xs uppercase tracking-widest text-muted-foreground">
        {group.label}
      </AppText>
      {group.entries.map((entry) => (
        <CoffeeRow
          entry={entry}
          key={entry.id}
          subtitle={`${entry.cafe.cafeName} · ${entry.cafe.location}`}
        />
      ))}
    </View>
  ))
}

export default function LogScreen() {
  return (
    <Screen scroll>
      <AppText className="mt-2.5 font-serif text-3xl">
        [ coffee<AppText className="font-serif text-3xl text-primary">log</AppText> ]
      </AppText>
      <SuspenseSection
        errorMessage="Couldn't load your coffees."
        fallback={
          <View className="mt-5">
            <CoffeeRowSkeleton />
            <CoffeeRowSkeleton />
            <CoffeeRowSkeleton />
          </View>
        }
      >
        <CoffeeList />
      </SuspenseSection>
    </Screen>
  )
}
