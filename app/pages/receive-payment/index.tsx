import CustomerOption from "@/components/customer-option";
import LayoutHeader from "@/components/layouts/header";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Grid, GridItem } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTransaction } from "@/store/slices/transaction/transaction-slice";
import { formatNumber } from "@/utils/helpers/formater";
import { router } from "expo-router";
import { NotebookPen, Rocket } from "lucide-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function ReceivePayment() {
  const { transaction, paymentMethod } = useAppSelector(
    (state) => state.transaction
  );
  const dispatch = useAppDispatch();

  function handleReceive() {
    const paymentMethod = transaction.paymentMethod;
    console.log(paymentMethod);
    if (["credit_card", "debit_card", "other"].includes(paymentMethod)) {
      router.replace("/pages/receive-payment/detail");
    } else if (paymentMethod === "cash") {
      router.push("/pages/receive-payment/cashier");
    }
  }

  return (
    <View className="flex-1">
      <LayoutHeader title="Receive Payment" goBack />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        bounces={false} // iOS
        alwaysBounceVertical={false} // iOS
        overScrollMode="never"
      >
        <VStack className="gap-1">
          <Card>
            <CustomerOption />
          </Card>
          <Card>
            <VStack className="gap-4">
              <HStack className="justify-between">
                <Text className="font-bold" size="lg">
                  Total Transaksi
                </Text>
                <Text className="font-bold" size="lg">
                  Rp. {formatNumber(transaction.totalPrice || 0)}
                </Text>
              </HStack>
              <HStack className="justify-between">
                <Text className="font-semibold text-gray-400" size="md">
                  Subtotal
                </Text>
                <Text className="font-semibold text-gray-400" size="md">
                  Rp. {formatNumber(transaction.price || 0)}
                </Text>
              </HStack>

              <Card variant="outline">
                <HStack className="gap-2 items-center">
                  <Icon as={NotebookPen} className="text-gray-500" />
                  <Text size="md" className="font-semibold">
                    Catatan Transaksi
                  </Text>
                </HStack>
                <Divider className="my-3" />
                <Text> {transaction.note || "Tidak Ada Catatan"}</Text>
              </Card>
            </VStack>
          </Card>
          <Card>
            <Text className="font-bold" size="lg">
              Pembayaran Digital ?
            </Text>
            <VStack className="gap-3 pb-10">
              <Card variant="outline">
                <HStack className="justify-between items-center">
                  <Text size="lg">QRIS Dinamis</Text>
                  <HStack className="bg-secondary-400 py-2 px-4 rounded-md gap-2 items-center">
                    <Icon as={Rocket} className="text-gray-500" />
                    <Text>Fitur segera hadir</Text>
                  </HStack>
                </HStack>
                <Divider className="my-3" />
                <Text>
                  Bayar menggunakan QRIS yang dihasilkan khusus untuk transaksi
                  ini dengan nominal tertentu.
                </Text>
              </Card>
              <Card variant="outline">
                <HStack className="justify-between items-center">
                  <Text size="lg">QRIS Statis</Text>
                  <HStack className="bg-secondary-400 py-2 px-4 rounded-md gap-2 items-center">
                    <Icon as={Rocket} className="text-gray-500" />
                    <Text>Fitur segera hadir</Text>
                  </HStack>
                </HStack>
                <Divider className="my-3" />
                <Text>
                  Terhubung dengan pembayaran QRIS statis yang diselesaikan oleh
                  pelanggan.
                </Text>
              </Card>
            </VStack>

            <Text className="font-bold" size="lg">
              Metode pembayaran ?
            </Text>

            <Grid _extra={{ className: "grid-cols-2" }} className="gap-3 mt-4">
              {paymentMethod.map((e) => (
                <GridItem key={e.id} _extra={{ className: "" }}>
                  <TouchableOpacity
                    onPress={() =>
                      dispatch(
                        setTransaction({
                          paymentMethod: e.id,
                        })
                      )
                    }
                  >
                    <Card
                      variant="outline"
                      className={`h-18 ${
                        transaction.paymentMethod === e.id
                          ? "border-primary-400"
                          : "border-secondary-500"
                      }`}
                    >
                      <Center className="flex-1">
                        <Heading className="text-gray-500" size="md">
                          {e.label}
                        </Heading>
                      </Center>
                    </Card>
                  </TouchableOpacity>
                </GridItem>
              ))}
            </Grid>
          </Card>
        </VStack>
      </ScrollView>
      <View className="absolute bottom-0 w-full bg-white shadow-sm pb-14 pt-5 px-5">
        <Button
          variant="outline"
          size="xl"
          disabled={!transaction.paymentMethod}
          action={!transaction.paymentMethod ? "secondary" : "primary"}
          onPress={handleReceive}
        >
          <ButtonText>Terima Pembayaran</ButtonText>
        </Button>
      </View>
    </View>
  );
}
