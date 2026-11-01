import { useSuspenseQuery } from "@apollo/client/react"
import { Suspense } from "react"
import { AppText, Screen } from "@/components"
import { CAFES } from "@/graphql/cafe"

function CafesList() {
  const { data } = useSuspenseQuery(CAFES)
  return data.cafes.map((cafe) => <AppText key={cafe.id}>{cafe.cafeName}</AppText>)
}

export default function CafesScreen() {
  return (
    <Screen scroll>
      <AppText className="font-serif text-3xl">Cafes</AppText>
      <Suspense fallback={<AppText className="text-muted-foreground">Loading...</AppText>}>
        <CafesList />
      </Suspense>
    </Screen>
  )
}
