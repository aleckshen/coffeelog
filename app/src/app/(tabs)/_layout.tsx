import { Tabs } from "expo-router/js-tabs"
import { ChartColumn, FileText, MapPin, Tag } from "lucide-react-native"
import { TabBar } from "@/components"

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="(log)"
        options={{
          title: "Log",
          tabBarIcon: ({ color }) => <FileText color={color} size={22} strokeWidth={1.7} />,
        }}
      />
      <Tabs.Screen
        name="(cafes)"
        options={{
          title: "Cafes",
          tabBarIcon: ({ color }) => <MapPin color={color} size={22} strokeWidth={1.7} />,
        }}
      />
      <Tabs.Screen
        name="(tags)"
        options={{
          title: "Tags",
          tabBarIcon: ({ color }) => <Tag color={color} size={22} strokeWidth={1.7} />,
        }}
      />
      <Tabs.Screen
        name="(stats)"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => <ChartColumn color={color} size={22} strokeWidth={1.7} />,
        }}
      />
    </Tabs>
  )
}
