import { LinearGradient } from "expo-linear-gradient";
import { ComponentType } from "react";
import { ColorValue, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Text } from "./ui/text";

interface Props {
  gradient: readonly [ColorValue, ColorValue, ...ColorValue[]];
  title: string;
  subtitle: string;
  icon: ComponentType<{ size?: number; color?: string }>;
  onPress: () => void;
  large: boolean;
}
export default function ActionTile({
  gradient,
  title,
  subtitle,
  icon: Icon,
  onPress,
  large = false,
}: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { stiffness: 300, damping: 20 });
  };

  return (
    <View>
      <Animated.View style={[animatedStyle, { width: "100%" }]}>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onPress}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              height: large ? 120 : 140,
              borderRadius: 10,
              padding: 20,
              justifyContent: "space-between",
            }}
          >
            <Icon size={large ? 28 : 32} color="rgba(255, 255, 255, 0.9)" />
            <View>
              <Text
                className="text-white mb-1font-bold"
                style={{
                  fontSize: large ? 14 : 16,
                }}
              >
                {title}
              </Text>
              <Text
                className="text-white font-semibold"
                style={{
                  fontSize: large ? 12 : 14,
                }}
              >
                {subtitle}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
