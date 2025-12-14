import { ITransaction } from "@/utils/interfaces/product";
import * as Haptics from "expo-haptics";
import { ChevronRight, Receipt } from "lucide-react-native";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Card } from "../ui/card";
import { Center } from "../ui/center";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

interface Props {
  transaction: ITransaction;
  index: number;
}
export default function TransactionCard({ transaction, index }: Props) {
  const scale = useSharedValue(1);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 100 });
    Haptics.selectionAsync();
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { stiffness: 300, damping: 20 });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50)}
      style={animatedStyle}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={{
          paddingBottom: 10,
        }}
        // style={{
        //   backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
        //   borderRadius: 16,
        //   padding: 20,
        //   marginBottom: 12,
        //   shadowColor: "#000",
        //   shadowOffset: { width: 0, height: 2 },
        //   shadowOpacity: isDark ? 0.3 : 0.1,
        //   shadowRadius: 8,
        //   elevation: 3,
        // }}
      >
        <Card
          className="rounded-xl"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: isDark ? 0.3 : 0.1,
            shadowRadius: 10,
            elevation: 4,
          }}
        >
          <HStack className="items-center"
          // style={{
          //   flexDirection: "row",
          //   justifyContent: "space-between",
          //   alignItems: "flex-start",
          // }}
          >
            <View style={{ flex: 1 }}>
              <HStack className="mb-2">
                <Center
                  className={`w-10 h-10 opacity-25 mr-3 rounded-full ${
                    transaction.type === "sale"
                      ? "bg-success-100"
                      : "bg-error-100"
                  }`}
                >
                  <Receipt
                    size={20}
                    color={transaction.type === "sale" ? "#10B981" : "#EF4444"}
                  />
                </Center>

                <VStack className="flex-1">
                  <Text className="text-lg font-semibold">
                    Transaction #{transaction.id}
                  </Text>
                  <Text className="text-xs">
                    {formatDate(transaction.date)} at{" "}
                    {formatTime(transaction.date)}
                  </Text>
                </VStack>
              </HStack>

              <HStack className="justify-between items-center pr-5">
                <Text className="text-xs uppercase font-semibold tracking-wider">
                  {transaction.items}{" "}
                  {transaction.items === 1 ? "item" : "items"}
                </Text>
                <Text
                  className={`text-lg font-bold ${
                    transaction.type === "sale"
                      ? "text-success-500"
                      : "text-error-500"
                  }`}
                >
                  Rp {transaction.total}
                </Text>
              </HStack>

              {transaction.customer && (
                <Text className="text-xs mb-1">
                  Customer: {transaction.customer}
                </Text>
              )}

              <Text className="text-xs">
                Payment: {transaction.paymentMethod}
              </Text>
            </View>

            <ChevronRight
              size={20}
              color={isDark ? "rgba(255, 255, 255, 0.4)" : "#9CA3AF"}
            />
          </HStack>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
}
