import React from "react";
import { Pressable, ViewStyle } from "react-native";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from "react-native-reanimated";

interface Props {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  disabled?: boolean;
}

export default function Bounce({ children, onPress, style, disabled }: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (disabled) return;
    scale.value = withTiming(0.9, { duration: 100 }); // mengecil
  };

  const handlePressOut = () => {
    if (disabled) return;
    // kembali bounce ke normal lalu panggil onPress
    scale.value = withTiming(1, { duration: 120 }, () => {
      if (onPress) {
        runOnJS(onPress!)();
      }
    });
  };
  const handlePress = () => {
    if (disabled) return;

    // Bounce effect: kecil -> besar -> normal
    scale.value = withSequence(
      withTiming(0.9, { duration: 80 }),
      withTiming(1.05, { duration: 80 }),
      withTiming(1, { duration: 80 })
    );

    onPress?.();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={style}
    >
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Pressable>
  );
}
