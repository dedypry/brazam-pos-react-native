import { IProductItem } from "@/utils/interfaces/product";
import { Minus, Plus, Trash2 } from "lucide-react-native";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import Animated, {
  SlideInRight,
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
  item: IProductItem;
  onUpdateQuantity: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
  index: number;
}
export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  index,
}: Props) {
  const scale = useSharedValue(1);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { stiffness: 300, damping: 10 });
  };

  return (
    <Animated.View
      entering={SlideInRight.delay(index * 100)}
      style={animatedStyle}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        // style={{
        //   backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
        //   borderRadius: 16,
        //   padding: 16,
        //   marginBottom: 16,
        //   flexDirection: "row",
        //   alignItems: "center",
        //   shadowColor: "#000",
        //   shadowOffset: { width: 0, height: 2 },
        //   shadowOpacity: isDark ? 0.3 : 0.1,
        //   shadowRadius: 8,
        //   elevation: 3,
        // }}
      >
        <Card
          className="mb-2 rounded-xl p-0"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isDark ? 0.3 : 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <HStack>
            <Image
              source={{ uri: item.image }}
              className="w-28 aspect-square rounded-xl"
            />
            <VStack className="flex-1 ml-4 py-2 gap-1">
              <Text className="text-md font-bold">{item.name}</Text>
              <Text className="text-lg font-extrabold text-success-300">
                Rp {item.price}
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  style={{
                    backgroundColor: "#EF4444",
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Minus size={16} color="white" />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: isDark ? "rgba(255, 255, 255, 0.9)" : "#1F2937",
                    marginHorizontal: 16,
                    minWidth: 30,
                    textAlign: "center",
                  }}
                >
                  {item.quantity}
                </Text>

                <TouchableOpacity
                  onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  style={{
                    backgroundColor: "#10B981",
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Plus size={16} color="white" />
                </TouchableOpacity>
              </View>
            </VStack>

            <View className="items-end justify-center mr-2">
              <Text className="text-lg font-bold">
                Rp {(parseFloat(item.price) * item.quantity).toFixed(2)}
              </Text>

              <TouchableOpacity
                onPress={() => onRemove(item.id)}
                style={{
                  padding: 8,
                }}
              >
                <Trash2 size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </HStack>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
}
