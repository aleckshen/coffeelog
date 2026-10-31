import type { BottomTabBarProps } from "expo-router/js-tabs"
import { Pressable, Text, View } from "react-native"
import { useCSSVariable } from "uniwind"

export function TabBar({ state, descriptors, navigation, insets }: BottomTabBarProps) {
  const [active, inactive] = useCSSVariable([
    "--color-primary",
    "--color-muted-foreground",
  ]) as string[]

  return (
    <View
      className="flex-row border-t border-border bg-card pt-2.5"
      style={{ paddingBottom: insets.bottom }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const focused = state.index === index
        const color = focused ? active : inactive

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name)
        }

        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            className="flex-1 items-center gap-1"
            key={route.key}
            onPress={onPress}
          >
            {options.tabBarIcon?.({ color, focused, size: 22 })}
            <Text
              className={`font-sans-semibold text-[11px] ${focused ? "text-primary" : "text-muted-foreground"}`}
            >
              {options.title}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}
