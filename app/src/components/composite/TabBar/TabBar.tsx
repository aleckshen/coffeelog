import { router } from "expo-router"
import type { BottomTabBarProps } from "expo-router/js-tabs"
import { Plus } from "lucide-react-native"
import { Fragment } from "react"
import { Pressable, Text, View } from "react-native"
import { useCSSVariable } from "uniwind"

export function TabBar({ state, descriptors, navigation, insets }: BottomTabBarProps) {
  const [active, inactive, onPrimary] = useCSSVariable([
    "--color-primary",
    "--color-muted-foreground",
    "--color-primary-foreground",
  ]) as string[]

  return (
    <View
      className="flex-row border-t border-border bg-card pt-2.5 items-center"
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
          <Fragment key={route.key}>
            {index === 2 && (
              <View className="w-16 items-center">
                <Pressable
                  accessibilityLabel="Log a coffee"
                  accessibilityRole="button"
                  className="size-14 items-center justify-center rounded-full bg-primary"
                  onPress={() => router.push("/entry/new")}
                >
                  <Plus color={onPrimary} size={24} strokeWidth={2.2} />
                </Pressable>
              </View>
            )}
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              className="flex-1 items-center gap-1"
              onPress={onPress}
            >
              {options.tabBarIcon?.({ color, focused, size: 22 })}
              <Text
                className={`font-sans-semibold text-xs ${focused ? "text-primary" : "text-muted-foreground"}`}
              >
                {options.title}
              </Text>
            </Pressable>
          </Fragment>
        )
      })}
    </View>
  )
}
