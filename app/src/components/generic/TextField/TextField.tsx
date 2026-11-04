import { TextInput, type TextInputProps, View } from "react-native"
import { cn } from "@/lib/cn"
import { AppText } from "../../primitives/AppText/AppText"

type TextFieldProps = TextInputProps & {
  label: string
}

export function TextField({ label, className, ...props }: TextFieldProps) {
  return (
    <View className="gap-2">
      <AppText className="font-sans-semibold text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </AppText>
      <TextInput
        accessibilityLabel={label}
        className={cn(
          "rounded-xl border border-border bg-background p-3 font-sans text-[15px] text-foreground",
          className,
        )}
        placeholderTextColorClassName="accent-muted-foreground"
        selectionColorClassName="accent-primary"
        {...props}
      />
    </View>
  )
}
