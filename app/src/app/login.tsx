import { CombinedGraphQLErrors } from "@apollo/client"
import { useMutation } from "@apollo/client/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Pressable, View } from "react-native"
import { AppText, Button, Screen, TextField } from "@/components"
import { LOG_IN, SIGN_UP } from "@/features/auth/auth.mutations"
import { type AuthFormValues, authSchema } from "@/features/auth/auth.schema"
import { saveToken } from "@/lib/session"

export default function LoginScreen() {
  const [mode, setMode] = useState<"logIn" | "signUp">("logIn")
  const { control, handleSubmit, setError, clearErrors, formState } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { username: "", password: "" },
  })
  const [logIn] = useMutation(LOG_IN)
  const [signUp] = useMutation(SIGN_UP)
  const isLogIn = mode === "logIn"

  const submit = handleSubmit(async (values) => {
    try {
      const token = isLogIn
        ? (await logIn({ variables: values })).data?.logIn.token
        : (await signUp({ variables: values })).data?.signUp.token
      if (token) await saveToken(token)
    } catch (error) {
      setError("root", {
        message: CombinedGraphQLErrors.is(error)
          ? (error.errors[0]?.message ?? "Something went wrong. Try again.")
          : "Couldn't reach the server. Try again.",
      })
    }
  })

  return (
    <Screen className="grow justify-center pb-24" scroll>
      <AppText className="text-center font-serif text-3xl">[ coffeelog ]</AppText>
      <AppText className="mt-4 mb-8 text-center text-sm text-muted-foreground">
        {isLogIn ? "Log in to see your coffees." : "Make an account to start logging coffees."}
      </AppText>
      <View className="gap-4.5">
        <Controller
          control={control}
          name="username"
          render={({ field, fieldState }) => (
            <TextField
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect={false}
              error={fieldState.error?.message}
              label="Username"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              textContentType="username"
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <TextField
              autoComplete={isLogIn ? "current-password" : "new-password"}
              error={fieldState.error?.message}
              label="Password"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              onSubmitEditing={submit}
              placeholder={isLogIn ? undefined : "At least 8 characters"}
              secureTextEntry
              textContentType={isLogIn ? "password" : "newPassword"}
              value={field.value}
            />
          )}
        />
        {formState.errors.root && (
          <AppText className="text-xs text-destructive">{formState.errors.root.message}</AppText>
        )}
        <Button
          className="mt-2"
          disabled={formState.isSubmitting}
          label={isLogIn ? "Log in" : "Sign up"}
          onPress={submit}
          variant="primary"
        />
        <Pressable
          accessibilityRole="button"
          className="items-center py-2 active:opacity-70"
          onPress={() => {
            clearErrors()
            setMode(isLogIn ? "signUp" : "logIn")
          }}
        >
          <AppText className="text-sm text-muted-foreground">
            {isLogIn ? "New here? " : "Have an account? "}
            <AppText className="font-sans-semibold text-sm text-primary">
              {isLogIn ? "Sign up" : "Log in"}
            </AppText>
          </AppText>
        </Pressable>
      </View>
    </Screen>
  )
}
