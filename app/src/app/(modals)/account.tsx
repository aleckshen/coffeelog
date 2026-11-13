import { useQuery } from "@apollo/client/react"
import { router } from "expo-router"
import { useState } from "react"
import { View } from "react-native"
import { AppText, Button, ConfirmDialog, ModalHeader } from "@/components"
import { ME } from "@/features/auth/auth.queries"
import { signOut } from "@/lib/apollo"

export default function AccountScreen() {
  const { data } = useQuery(ME)
  const [confirmOpen, setConfirmOpen] = useState(false)

  async function logOut() {
    setConfirmOpen(false)
    router.back()
    await signOut()
  }

  return (
    <View className="flex-1 bg-card">
      <ModalHeader
        onCancel={() => router.back()}
        onSave={() => router.back()}
        saveLabel="Done"
        title="Account"
      />
      <View className="gap-6 px-5 pt-6">
        <AppText className="text-muted-foreground">
          Logged in as{" "}
          <AppText className="font-sans-semibold text-foreground">{data?.me?.username}</AppText>
        </AppText>
        <Button label="Log out" onPress={() => setConfirmOpen(true)} variant="block" />
      </View>
      <ConfirmDialog
        confirmLabel="Log out"
        message="You'll need your username and password to log back in."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={logOut}
        title="Log out?"
        visible={confirmOpen}
      />
    </View>
  )
}
