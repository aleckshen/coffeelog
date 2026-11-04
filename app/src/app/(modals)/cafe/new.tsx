import { View } from "react-native"
import { ModalHeader, TextField } from "@/components"

export default function NewCafeScreen() {
  return (
    <View className="flex-1 bg-card">
      <ModalHeader title="New cafe" />
      <View className="gap-4.5 px-5 pt-4.5">
        <TextField label="Cafe name" placeholder="e.g. Holiday" />
        <TextField label="Location" placeholder="e.g. Mt Eden, Auckland" />
      </View>
    </View>
  )
}
