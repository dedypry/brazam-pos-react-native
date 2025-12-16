import { db } from "@/db";
import { salesSchema } from "@/db/schema";
import { formatNumber } from "@/utils/helpers/formater";
import { ISales } from "@/utils/interfaces/product";
import { inArray } from "drizzle-orm";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import ConfirmAlert from "../confirm-alert";
import { Button, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

interface Props {
  carts: ISales[];
}
export default function ButtonComplete({ carts }: Props) {
  const [isComplete, setIsComplete] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (carts.length > 0) {
      let totalPrice = 0;
      carts.map((e) => {
        totalPrice += (e.quantity || 1) * e.product.price;
      });
      setTotal(totalPrice);
    }
  }, [carts]);

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
      await db
        .update(salesSchema)
        .set({
          status: "finish",
        })
        .where(inArray(salesSchema.id, ids));
      // .where(sql`id IN(${ids})`);
      setIsComplete(false);
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
        <Text className="font-semibold">Total : Rp {formatNumber(total)}</Text>
      </ConfirmAlert>
      <View className="absolute bottom-0 w-full px-5 py-3">
        <HStack className="pb-2 items-center bg-white p-4 rounded-md shadow-sm">
          <VStack className="flex-1 pr-10">
            <Heading size="sm">Total</Heading>
            <Heading size="md" className="text-success-300">
              Rp {formatNumber(total)}
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
