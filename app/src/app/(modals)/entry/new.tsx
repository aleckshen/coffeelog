import { View } from "react-native"
import { ModalHeader } from "@/components"

export default function NewEntryScreen() {
  return (
    <View className="flex-1 bg-card">
      <ModalHeader title="New coffee" />
    </View>
  )
}
