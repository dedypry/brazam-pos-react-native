import FormNumberInput from "@/components/form/number-input";
import LayoutHeader from "@/components/layouts/header";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Grid, GridItem } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { CloseCircleIcon, Icon } from "@/components/ui/icon";
import { InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { db } from "@/db";
import { salesSchema, transactionSchema } from "@/db/schema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetTransaction } from "@/store/slices/transaction/transaction-slice";
import { formatNumber } from "@/utils/helpers/formater";
import { generateTrxNo } from "@/utils/helpers/global";
import { max } from "drizzle-orm";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function Cashier() {
  const { transaction } = useAppSelector((state) => state.transaction);
  const [received, setReceived] = useState(0);
  const dispatch = useAppDispatch();
  const cashs = [100, 50, 20, 10, 5, 2, 1];
  const returnCash = received - transaction.totalPrice;

  async function handleReceivedPayment() {
    try {
      const [{ value: maxTrx }] = await db
        .select({ value: max(transactionSchema.id) })
        .from(transactionSchema);

      const noTrx = generateTrxNo(maxTrx || 0);

      const [trx] = await db
        .insert(transactionSchema)
        .values({
          trxNo: noTrx,
          discount: 0,
          totalPrice: transaction.totalPrice,
          paymentMethod: transaction.paymentMethod,
          paymentPrice: received,
          changePrice: returnCash,
        })
        .returning({ id: transactionSchema.id });

      console.log("TRX", trx);
      await db.insert(salesSchema).values({
        transactionId: trx.id,
        ...transaction,
        status: "finish",
      });
      dispatch(resetTransaction());
      router.replace(`/pages/receive-payment/${trx.id}`);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View className="flex-1">
      <LayoutHeader title="Input Jumlah Pembayaran" goBack />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        bounces={false} // iOS
        alwaysBounceVertical={false} // iOS
        overScrollMode="never"
      >
        <VStack className="gap-1">
          <Card className="px-5">
            <HStack className="justify-between">
              <VStack className="gap-2">
                <Text className="font-semibold">yang harus dibayar</Text>
                <Heading size="md">
                  RP {formatNumber(transaction.totalPrice)}
                </Heading>
              </VStack>
              <View>
                <Button
                  onPress={() => setReceived(transaction.totalPrice)}
                  variant="outline"
                  action="positive"
                >
                  <ButtonText className="text-success-500">
                    Terima Uang PAS
                  </ButtonText>
                </Button>
              </View>
            </HStack>
          </Card>

          <Card className="px-5 h-full">
            <VStack className="gap-2">
              <Text className="font-semibold">
                Uang diterima dari pelanggan
              </Text>
              <FormNumberInput
                value={received.toString()}
                onInput={setReceived}
                variant="paded"
                size="2xl"
                textAlign="right"
                prefix={
                  <InputSlot className="pl-3">
                    <Text size="2xl">Rp</Text>
                  </InputSlot>
                }
                suppix={
                  <InputSlot className="pr-3">
                    <TouchableOpacity onPress={() => setReceived(0)}>
                      <Icon as={CloseCircleIcon} className="text-gray-500" />
                    </TouchableOpacity>
                  </InputSlot>
                }
              />
              <Divider className="my-5" />

              <Grid _extra={{ className: "grid-cols-2" }} className="gap-4">
                {cashs.map((e) => (
                  <GridItem key={e} _extra={{ className: "" }}>
                    <TouchableOpacity
                      onPress={() => {
                        const cash = e * 1000;
                        setReceived(Number(received || 0) + cash);
                      }}
                    >
                      <Card variant="outline">
                        <Center>
                          <Text
                            size="xl"
                            className="font-semibold text-gray-500"
                          >
                            + {formatNumber(e * 1000)}
                          </Text>
                        </Center>
                      </Card>
                    </TouchableOpacity>
                  </GridItem>
                ))}
              </Grid>
            </VStack>
          </Card>
        </VStack>
      </ScrollView>

      <View className="absolute bottom-0 w-full bg-white shadow-sm pb-14 pt-5 px-5">
        <HStack className="pb-5 justify-between items-center">
          <Heading size="md" className="text-gray-500">
            Kembalian
          </Heading>
          <Heading>Rp {formatNumber(returnCash < 1 ? 0 : returnCash)}</Heading>
        </HStack>
        <Button size="xl" onPress={handleReceivedPayment}>
          <ButtonText>Lanjutkan Pembayaran</ButtonText>
        </Button>
      </View>
    </View>
  );
}
