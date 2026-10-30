import { Tabs } from "expo-router"

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="(log)" options={{ title: "Log" }} />
      <Tabs.Screen name="(cafes)" options={{ title: "Cafes" }} />
      <Tabs.Screen name="(tags)" options={{ title: "Tags" }} />
      <Tabs.Screen name="(stats)" options={{ title: "Stats" }} />
    </Tabs>
  )
}
