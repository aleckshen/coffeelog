import { View } from "react-native"
import { AppText } from "../../primitives/AppText/AppText"
import { Button } from "../../primitives/Button/Button"

type ErrorMessageProps = {
  message: string
  onRetry: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <View className="items-center gap-3 py-10">
      <AppText className="text-center text-muted-foreground">{message}</AppText>
      <Button label="Try again" onPress={onRetry} />
    </View>
  )
}
