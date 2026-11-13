import * as SecureStore from "expo-secure-store"
import { useSyncExternalStore } from "react"

const TOKEN_KEY = "coffeelog.token"

// undefined until the saved token has been read from the keychain.
let token: string | null | undefined
const listeners = new Set<() => void>()

function setToken(next: string | null) {
  token = next
  for (const listener of listeners) listener()
}

export async function loadToken() {
  setToken(await SecureStore.getItemAsync(TOKEN_KEY))
}

export async function saveToken(next: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, next)
  setToken(next)
}

export async function clearToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY)
  setToken(null)
}

export function getToken() {
  return token ?? null
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useToken() {
  return useSyncExternalStore(subscribe, () => token)
}
