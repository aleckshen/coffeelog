import { useSuspenseQuery } from "@apollo/client/react"
import { useState } from "react"
import { Modal, View } from "react-native"
import {
  AppText,
  ListRow,
  MetaLine,
  ModalHeader,
  Skeleton,
  SuspenseSection,
  TextField,
} from "@/components"
import { CAFES } from "@/features/cafe/cafe.queries"

type CafePickerSheetProps = {
  visible: boolean
  selectedCafeId: string
  onPick: (cafeId: string) => void
  onCancel: () => void
}

export function CafePickerSheet({
  visible,
  selectedCafeId,
  onPick,
  onCancel,
}: CafePickerSheetProps) {
  return (
    <Modal
      animationType="slide"
      onRequestClose={onCancel}
      presentationStyle="pageSheet"
      visible={visible}
    >
      <SheetBody onCancel={onCancel} onPick={onPick} selectedCafeId={selectedCafeId} />
    </Modal>
  )
}

function SheetBody({ selectedCafeId, onPick, onCancel }: Omit<CafePickerSheetProps, "visible">) {
  const [search, setSearch] = useState("")

  return (
    <View className="flex-1 bg-card">
      <ModalHeader onCancel={onCancel} title="Choose cafe" />
      <View className="px-5 pt-4.5">
        <TextField
          label="Search"
          onChangeText={setSearch}
          placeholder="Search cafes"
          value={search}
        />
        <SuspenseSection
          errorMessage="Couldn't load your cafes."
          fallback={<Skeleton className="mt-3 h-12 w-full" />}
        >
          <CafePickList onPick={onPick} search={search} selectedCafeId={selectedCafeId} />
        </SuspenseSection>
      </View>
    </View>
  )
}

type CafePickListProps = {
  search: string
  selectedCafeId: string
  onPick: (cafeId: string) => void
}

function CafePickList({ search, selectedCafeId, onPick }: CafePickListProps) {
  const { data } = useSuspenseQuery(CAFES)
  const query = search.trim().toLowerCase()
  const cafes = data.cafes.filter(
    (cafe) =>
      cafe.cafeName.toLowerCase().includes(query) || cafe.location.toLowerCase().includes(query),
  )

  if (!cafes.length) {
    return (
      <AppText className="py-4.5 text-sm text-muted-foreground">
        {data.cafes.length ? "No cafes match." : "No cafes yet. Add one on the Cafes tab."}
      </AppText>
    )
  }

  return cafes.map((cafe) => {
    const on = cafe.id === selectedCafeId
    return (
      <ListRow accessibilityState={{ selected: on }} key={cafe.id} onPress={() => onPick(cafe.id)}>
        <View className="flex-1 gap-1">
          <AppText className={on ? "font-sans-semibold text-primary" : "font-sans-semibold"}>
            {cafe.cafeName}
            {on ? "  ✓" : ""}
          </AppText>
          <MetaLine parts={[cafe.location]} small />
        </View>
      </ListRow>
    )
  })
}
