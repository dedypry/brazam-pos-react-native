/* eslint-disable react-hooks/rules-of-hooks */
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Pressable } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function TabBar({ navigationState, jumpTo }: any) {
  return (
    <HStack className="mx-4 p-2 gap-2">
      {navigationState.routes.map((route: any, i: number) => {
        const isFocused = navigationState.index === i;

        const animatedStyle = useAnimatedStyle(() => {
          return {
            backgroundColor: withTiming(
              isFocused
                ? "rgba(37, 99, 235, 0.3)" // blue-600
                : "transparent", 
              { duration: 200 }
            ),
          };
        }, [isFocused]);

        return (
          <Pressable
            key={route.key}
            onPress={() => jumpTo(route.key)}
            style={{ flex: 1 }}
          >
            <Animated.View
              style={animatedStyle}
              className="py-2 rounded-lg items-center"
            >
              <Text
                className={`font-semibold ${
                  isFocused ? "text-blue-900" : "text-gray-500"
                }`}
              >
                {route.title}
              </Text>
            </Animated.View>
          </Pressable>
        );
      })}
    </HStack>
  );
}
