import { DarkTheme } from "expo-router"
import { useCSSVariable } from "uniwind"

export function useNavigationTheme() {
  const [background, card, text, border, primary] = useCSSVariable([
    "--color-background",
    "--color-card",
    "--color-foreground",
    "--color-border",
    "--color-primary",
  ]) as string[]
  return { ...DarkTheme, colors: { ...DarkTheme.colors, background, card, text, border, primary } }
}
