import { useSuspenseQuery } from "@apollo/client/react"
import { router } from "expo-router"
import { View } from "react-native"
import { AppText, Button, Screen, SuspenseSection } from "@/components"
import { TagRow } from "@/features/tag/components/TagRow/TagRow"
import { TagRowSkeleton } from "@/features/tag/components/TagRowSkeleton/TagRowSkeleton"
import { TAGS } from "@/features/tag/tag.queries"

function TagsList() {
  const { data } = useSuspenseQuery(TAGS)
  return data.tags.map((tag) => <TagRow key={tag.id} tag={tag} />)
}

export default function TagsScreen() {
  return (
    <Screen scroll>
      <View className="mt-2.5 mb-4 flex-row items-center justify-between">
        <AppText className="font-serif text-3xl">Tags</AppText>
        <Button label="Add tag" onPress={() => router.push("/tag/new")} />
      </View>
      <AppText className="mb-4.5 text-sm text-muted-foreground">
        Your own labels that attach to any number of coffee entries. Tap on one to filter the log.
      </AppText>
      <SuspenseSection
        errorMessage="Couldn't load your tags."
        fallback={
          <View>
            <TagRowSkeleton />
            <TagRowSkeleton />
            <TagRowSkeleton />
          </View>
        }
      >
        <TagsList />
      </SuspenseSection>
    </Screen>
  )
}
