import { LinearGradient } from "expo-linear-gradient";
import { ComponentType } from "react";
import {
  ColorValue,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

interface Props {
  gradient?: readonly [ColorValue, ColorValue, ...ColorValue[]];
  title: string;
  subtitle?: string;
  onPress?: () => void;
  icon?: ComponentType<{ size?: number; color?: string }>;
}
export default function HeaderTitle({
  gradient = ["#FF6B6B", "#FF8E8E"],
  title,
  subtitle,
  icon: Icon,
  onPress,
}: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <HStack className={`px-5 justify-between items-center`}>
      <VStack>
        <Text className="text-3xl font-bold">{title}</Text>
        <Text>{subtitle}</Text>
      </VStack>
      {onPress && Icon ? (
        <TouchableOpacity onPress={onPress}>
          <LinearGradient
            colors={gradient}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </HStack>
  );
}
