import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCart } from "@/store/slices/cart/cart-slice";
import { Alert, useColorScheme, View } from "react-native";
import { Button, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";

export default function ButtonComplete() {
  const { carts } = useAppSelector((state) => state.cart);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const dispatch = useAppDispatch();

  const calculateSubtotal = () => {
    return carts.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleCheckout = () => {
    if (carts.length === 0) {
      Alert.alert("Empty Cart", "Please add items to cart before proceeding");
      return;
    }

    Alert.alert(
      "Complete Sale",
      `Total: $${calculateTotal().toFixed(2)}\n\nProceed with payment?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Complete",
          style: "default",
          onPress: () => {
            dispatch(setCart([]));
            Alert.alert("Sale Completed!", "Payment successful");
          },
        },
      ]
    );
  };

  if (carts.length === 0) return null;

  return (
    <View className="absolute bottom-0 w-full px-5 py-3">
      <HStack className="pb-2 items-center bg-white p-4 rounded-md shadow-sm">
        <VStack className="flex-1 pr-10">
          <Heading size="sm">Total</Heading>
          <Heading size="md" className="text-success-300">
            {" "}
            Rp {calculateTotal().toFixed(2)}
          </Heading>
        </VStack>
        <Button>
          <ButtonText>Selesaikan</ButtonText>
        </Button>
      </HStack>
    </View>
  );
}
