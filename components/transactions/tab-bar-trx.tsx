import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import {
    MaterialTopTabBar,
    useTabAnimation,
} from "@react-navigation/material-top-tabs";
import { Calculator, Package } from "lucide-react-native";
import { Animated } from "react-native";

export default function TabBarTrx(props: any) {
  const position = useTabAnimation();

  return (
    <MaterialTopTabBar
      {...props}
      renderLabel={({ route }: any) => {
        const index = props.state.routes.findIndex(
          (r: any) => r.key === route.key
        );

        const color = (position as any).interpolate({
          inputRange: props.state.routes.map((_: any, i: number) => i),
          outputRange: props.state.routes.map((_: any, i: number) =>
            i === index ? "#fff" : "#000"
          ),
        });

        const IconComp = route.name === "index" ? Package : Calculator;

        return (
          <HStack className="items-center gap-2">
            <Animated.View>
              <Icon as={IconComp} color={color} />
            </Animated.View>

            <Animated.Text
              style={{
                color,
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              {route.name === "index" ? "Product" : "Kalkulator"}
            </Animated.Text>
          </HStack>
        );
      }}
    />
  );
}
