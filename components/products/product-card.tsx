import { formatNumber } from "@/utils/helpers/formater";
import { IProduct } from "@/utils/interfaces/product";
import * as Haptics from "expo-haptics";
import {
  MoreVertical
} from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import Animated, {
  BounceIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Card } from "../ui/card";
import { HStack } from "../ui/hstack";
import { Image } from "../ui/image";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";
interface Props {
  product: IProduct;
  index: number;
  viewMode?: "list" | "grid";
  onPress?: () => void;
  onLongPress?: () => void;
}
export default function ProductCard({
  product,
  index,
  viewMode = "grid",
  onPress,
  onLongPress,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scale = useSharedValue(1);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (onPress) {
      onPress();
    }
    scale.value = withTiming(0.95, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { stiffness: 300, damping: 50 });
  };
  if (viewMode === "list") {
    return (
      <Animated.View
        entering={FadeInDown.delay(index * 100)}
        style={animatedStyle}
      >
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
        >
          <Card className="p-0 rounded-lg">
            <HStack className="items-center">
              <Image
                source={{ uri: product.photos[0] }}
                className="rounded-lg w-28 aspect-square"
                style={{
                  backgroundColor: isDark ? "#2D2D2D" : "#F3F4F6",
                }}
              />

              <VStack className="flex-1 ml-2 gap-2 items-baseline">
                <Text className="text-md font-semibold">{product.name}</Text>
                <Text className="text-xs">{product.category}</Text>
                <HStack className="gap-2 items-end">
                  <Text className="text-[#4ECDC4] text-lg font-bold">
                    Rp {formatNumber(product.price)}
                  </Text>
                  <Text className="text-xs font-semibold text-nowrap flex-1">
                    {product.stock} in stock
                  </Text>
                </HStack>
              </VStack>

              <TouchableOpacity className="pr-3">
                <MoreVertical
                  size={20}
                  color={isDark ? "rgba(255, 255, 255, 0.6)" : "#6B7280"}
                />
              </TouchableOpacity>
            </HStack>
          </Card>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      entering={BounceIn.delay(index * 100)}
      style={[animatedStyle, { width: "100%" }]}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLongPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setMenuOpen(true);
          onLongPress?.();
        }}
        activeOpacity={0.9}
      >
        <Card className="p-0">
          <Image
            source={{
              uri: product.photos[0],
            }}
            className="mb-6 h-[120px] w-full rounded-md"
            alt="image"
          />
          <VStack className="px-3 pb-3">
            <Text className="text-md font-semibold">{product.name}</Text>

            <Text className="text-xs">{product.category}</Text>

            <HStack className="justify-between flex-1">
              <Text className="text-md font-bold text-[#4ECDC4]">
                Rp {formatNumber(product.price)}
              </Text>
              <Text
                className="text-2xs font-semibold"
                style={{
                  color: product?.stock! > 10 ? "#10B981" : "#EF4444",
                }}
              >
                {product.stock} left
              </Text>
            </HStack>
          </VStack>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
}
