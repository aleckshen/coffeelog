import { Modal, View } from "react-native"
import { AppText } from "../../primitives/AppText/AppText"
import { Button } from "../../primitives/Button/Button"

type ConfirmDialogProps = {
  visible: boolean
  title: string
  message: string
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
  confirming?: boolean
  error?: string
}

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
  confirming,
  error,
}: ConfirmDialogProps) {
  return (
    <Modal animationType="fade" onRequestClose={onCancel} transparent visible={visible}>
      <View className="flex-1 justify-center bg-black/40 px-6">
        <View className="gap-3 rounded-3xl bg-card p-6">
          <AppText className="font-serif text-2xl">{title}</AppText>
          <AppText className="text-muted-foreground">{message}</AppText>
          {error && <AppText className="text-xs text-destructive">{error}</AppText>}
          <View className="mt-3 gap-3">
            <Button
              disabled={confirming}
              label={confirmLabel}
              onPress={onConfirm}
              variant="primary"
            />
            <Button label="Cancel" onPress={onCancel} variant="block" />
          </View>
        </View>
      </View>
    </Modal>
  )
}
