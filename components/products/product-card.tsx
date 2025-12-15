import { colors } from "@/utils/configs/colors";
import { formatNumber } from "@/utils/helpers/formater";
import { IProduct } from "@/utils/interfaces/product";
import * as Haptics from "expo-haptics";
import { CheckCheckIcon, MoreVertical } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import {
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { Card } from "../ui/card";
import { Center } from "../ui/center";
import { HStack } from "../ui/hstack";
import { Image } from "../ui/image";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";
interface Props {
  product: IProduct;
  index: number;
  viewMode?: "list" | "grid";
  onPress?: (selected: boolean) => void;
  onLongPress?: () => void;
  isSales?: boolean;
}
export default function ProductCard({
  product,
  index,
  viewMode = "grid",
  onPress,
  onLongPress,
  isSales,
}: Props) {
  const [isSelected, setIsSelected] = useState(false);
  const scale = useSharedValue(1);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handlePressIn = () => {
    if (onPress) {
      onPress(!isSelected);
    }
    setIsSelected(!isSelected);
    scale.value = withTiming(0.95, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { stiffness: 1000, damping: 100 });
  };
  if (viewMode === "list") {
    return (
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
              alt={product.name}
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
    );
  }

  return (
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onLongPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onLongPress?.();
          }}
          activeOpacity={0.9}
        >
          <Card className="p-0 relative">
            <Image
              source={{
                uri: product.photos[0],
              }}
              className="mb-2 h-[120px] w-full rounded-md"
              alt="image"
            />
            {isSelected && isSales && (
              <View className="absolute bg-green-300/40 h-[120px] w-full rounded-md">
                <Center className="flex-1">
                  <CheckCheckIcon size={50} color={colors.white} />
                </Center>
              </View>
            )}

            <VStack className="px-3 pb-3">
              <Text className="text-md font-semibold">{product.name}</Text>

              <Text className="text-xs">{product.category}</Text>

              <HStack className="justify-between items-center">
                <Text className="text-md font-bold text-[#4ECDC4]">
                  Rp {formatNumber(product.price)}
                </Text>
                <Text
                  className="text-2xs font-semibold"
                  style={{
                    color: product?.stock! > 10 ? "#10B981" : "#EF4444",
                  }}
                >
                  Stok {product.stock}
                </Text>
              </HStack>
            </VStack>
            <View className="px-3 pb-3">
              {/* {isSales && isSelected && (
                <FormNumberInput
                  value={qty.toString()}
                  prefix={
                    <InputSlot>
                      <Button
                        size="xs"
                        action="negative"
                        onPress={() => {
                          if (qty > 0) {
                            setQty(qty - 1);
                          }
                        }}
                      >
                        <ButtonIcon as={MinusIcon} className="text-white" />
                      </Button>
                    </InputSlot>
                  }
                  suppix={
                    <InputSlot>
                      <Button
                        size="xs"
                        action="positive"
                        onPress={() => {
                          setQty(qty + 1);
                        }}
                      >
                        <ButtonIcon as={PlusIcon} className="text-white" />
                      </Button>
                    </InputSlot>
                  }
                  size="sm"
                  isTextCenter
                />
              )} */}
            </View>
          </Card>
        </TouchableOpacity>
  );
}
