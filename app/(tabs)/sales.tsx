import ButtonComplete from "@/components/carts/button-complete";
import CartItem from "@/components/carts/cart-item";
import HeaderTitle from "@/components/header-title";
import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonText,
} from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handleRemoveItem, setCartItems } from "@/store/slices/cart/cart-slice";
import { router } from "expo-router";
import { Plus, Receipt } from "lucide-react-native";
import { ScrollView, useColorScheme, View } from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";

export default function SalesTab() {
  const { carts } = useAppSelector((state) => state.cart);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (itemId: number, qty: number) => {
    if (qty <= 0) {
      dispatch(handleRemoveItem(itemId));
      return;
    }

    dispatch(setCartItems({ itemId, qty }));
  };

  return (
    <>
      <View className="pt-14 bg-white pb-4">
        <HeaderTitle
          gradient={["#45B7D1", "#4ECDC4"]}
          title="Sales"
          icon={Plus}
          subtitle={`1 items in inventory`}
          onPress={() => router.push("/product-modal")}
        />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <View className="pt-5">
          {carts.length === 0 ? (
            <Center className="flex-1 pt-52">
              <Animated.View
                entering={BounceIn.delay(300)}
                style={{
                  alignItems: "center",
                }}
              >
                <Center className="w-28 h-28 bg-secondary-500 rounded-full">
                  <Receipt
                    size={48}
                    color={isDark ? "rgba(255, 255, 255, 0.4)" : "#9CA3AF"}
                  />
                </Center>

                <Text className="text-2xl font-bold mb-2">Start New Sale</Text>

                <Text className="text-md mb-8">
                  Add products to begin a transaction
                </Text>

                <ButtonGroup>
                  <Button
                    size="xl"
                    className="rounded-full"
                    onPress={() => router.push("/product-modal")}
                  >
                    <ButtonIcon as={Plus} />
                    <ButtonText>Add Products</ButtonText>
                  </Button>
                </ButtonGroup>
              </Animated.View>
            </Center>
          ) : (
            <>
              <View className="px-5">
                {carts.map((item, index) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    index={index}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={(id) => dispatch(handleRemoveItem(id))}
                  />
                ))}
              </View>

              {/* Checkout Summary */}
            </>
          )}
        </View>
      </ScrollView>
      <ButtonComplete />
    </>
  );
}
