import knex from "@/db/config";
import { SalesModel } from "@/db/models/sales";
import { formatNumber } from "@/utils/helpers/formater";
import { ISales } from "@/utils/interfaces/product";
import { Minus, Plus, Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import Animated, {
  SlideInRight,
  useSharedValue
} from "react-native-reanimated";
import { Card } from "../ui/card";
import { HStack } from "../ui/hstack";
import { Image } from "../ui/image";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

interface Props {
  item: ISales;
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
  const [qty, setQty] = useState(item.quantity);
  const scale = useSharedValue(1);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    if (item.quantity) {
      setQty(item.quantity);
    }
  }, [item.quantity]);

  async function handleQty(val: number) {
    setQty(val);

    try {
      if (val === 0) {
        onRemove(item.id);
      } else {
        await knex<SalesModel>("sales").where("id", item.id).update({
          quantity: val,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View>
      <Animated.View entering={SlideInRight.delay(index * 100)}>
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
              source={{ uri: item.product.photos[0] }}
              className="w-28 aspect-square rounded-xl"
              alt={item.product.name}
            />
            <VStack className="flex-1 ml-4 py-2 gap-1">
              <Text className="text-md font-bold">{item.product.name}</Text>
              <Text className="text-lg font-extrabold text-success-300">
                Rp {formatNumber(item.product.price)}
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => handleQty(qty - 1)}
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
                  {qty}
                </Text>

                <TouchableOpacity
                  onPress={() => handleQty(qty + 1)}
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
                Rp{" "}
                {formatNumber(
                  parseFloat(item.product.price.toString()) * item.quantity
                )}
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
      </Animated.View>
    </View>
  );
}
