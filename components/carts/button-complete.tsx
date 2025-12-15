import knex from "@/db/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCart } from "@/store/slices/cart/cart-slice";
import { formatNumber } from "@/utils/helpers/formater";
import { useState } from "react";
import { Alert, View } from "react-native";
import ConfirmAlert from "../confirm-alert";
import { Button, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

export default function ButtonComplete() {
  const { carts } = useAppSelector((state) => state.cart);
  const [isComplete, setIsComplete] = useState(false);

  const dispatch = useAppDispatch();

  const calculateSubtotal = () => {
    return carts.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return formatNumber(calculateSubtotal() + calculateTax());
  };

  const handleCheckout = () => {
    if (carts.length === 0) {
      Alert.alert("Empty Cart", "Please add items to cart before proceeding");
      return;
    }

    setIsComplete(true);
  };

  async function handleFinish() {
    const ids = carts.map((e) => e.id);

    try {
      await knex("sales").whereIn("id", ids).update({
        status: "finish",
      });
      setIsComplete(false)
      dispatch(setCart([]));
    } catch (error) {
      console.error(error);
    }
  }

  if (carts.length === 0) return null;

  return (
    <>
      <ConfirmAlert
        title="Konfirmasi pesanan selesai"
        buttonTitleConfirm="Ya, Selesaikan"
        color="positive"
        show={isComplete}
        onClose={() => setIsComplete(false)}
        onConfirm={handleFinish}
      >
        <Text className="font-semibold">Total : Rp {calculateTotal()}</Text>
      </ConfirmAlert>
      <View className="absolute bottom-0 w-full px-5 py-3">
        <HStack className="pb-2 items-center bg-white p-4 rounded-md shadow-sm">
          <VStack className="flex-1 pr-10">
            <Heading size="sm">Total</Heading>
            <Heading size="md" className="text-success-300">
              {" "}
              Rp {calculateTotal()}
            </Heading>
          </VStack>
          <Button onPress={handleCheckout}>
            <ButtonText>Selesaikan</ButtonText>
          </Button>
        </HStack>
      </View>
    </>
  );
}
