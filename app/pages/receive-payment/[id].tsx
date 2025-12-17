import CustomerOption from "@/components/customer-option";
import LayoutHeader from "@/components/layouts/header";
import ListText from "@/components/list-text";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { db } from "@/db";
import { colors } from "@/utils/configs/colors";
import { formatNumber } from "@/utils/helpers/formater";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams } from "expo-router";
import { PrinterIcon } from "lucide-react-native";
import { ScrollView, View } from "react-native";

export default function ReceiveDetail() {
  const { id } = useLocalSearchParams();
  console.log("ID", id);
  const { data } = useLiveQuery(
    db.query.transactionSchema.findFirst({
      where: (trx, { eq }) => eq(trx.id, Number(id || 1)),
      with: {
        transactionItems: true,
      },
    })
  );

  return (
    <View className="flex-1">
      <LayoutHeader title="Detail Transaksi" />
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
        <VStack className="gap-2">
          <Card>
            <Center className="gap-2">
              <View className="bg-success-500 py-1 px-3 rounded-md mb-5">
                <Heading className="text-white" size="sm">
                  PAID
                </Heading>
              </View>
              <Heading size="3xl">
                Rp {formatNumber(data?.totalPrice || 0)}
              </Heading>
              <VStack className="items-center">
                <Text>Kembalian Ke pelanggan</Text>
                <Text size="xl" className="font-semibold">
                  Rp. {formatNumber(data?.changePrice!)}
                </Text>
              </VStack>
              <Text>
                Tanggal Pembayaran :{" "}
                {dayjs(data?.createdAt).format("DD MMM YYYY HH:mm")}
              </Text>
            </Center>
          </Card>
          <Card>
            <HStack>
              <View className="pr-8">
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: colors.primary,
                    borderRadius: 100,
                    padding: 2,
                  }}
                >
                  <View className="w-2 h-2 rounded-full bg-primary-500" />
                </View>
              </View>
              <VStack className="gap-1 pr-5">
                <Text>
                  {dayjs(data?.createdAt).format("dddd, MMM YYYY HH:mm")}
                </Text>
                <Text className="font-bold">
                  Terima Pembayaran {data?.paymentMethod}
                </Text>
                <Text size="sm">IDR {formatNumber(data?.totalPrice || 0)}</Text>
                <Text size="sm">dari transaksi {data?.trxNo}</Text>
                <Text size="sm">
                  kamu terima langsung secara {data?.paymentMethod}
                </Text>
               
              </VStack>
            </HStack>
          </Card>
          <Card>
            <CustomerOption />
            <Card variant="outline" className="mt-5">
              <Center>
                <Heading>Brazam</Heading>
                <Text>Kabupaten Tangerang, Banten, indonesia 15731</Text>
                <Text>081286141441</Text>
                <Text>
                  {dayjs(data?.createdAt).format("DD/MM/YYYY, HH:mm")}
                </Text>
              </Center>
              <Divider className="my-3" />

              <ListText
                title="Subtotal"
                value={`Rp ${formatNumber(
                  data?.paymentMethod === "cash"
                    ? data?.totalPrice!
                    : data?.subtotal!
                )}`}
              />

              <Divider className="my-3" />
              <VStack className="gap-2">
                <HStack className="justify-between items-center">
                  <Text size="lg" className="font-semibold">
                    Total Orders
                  </Text>
                  <Text size="lg" className="font-semibold">
                    Rp
                    {formatNumber(
                      data?.paymentMethod === "cash"
                        ? data?.totalPrice!
                        : data?.subtotal!
                    )}
                  </Text>
                </HStack>
                <ListText
                  title="Metode Pembayaran"
                  value={(data?.paymentMethod || "").toUpperCase()}
                />
                <ListText
                  title="Tunai"
                  value={`Rp. ${formatNumber(data?.paymentPrice!)}`}
                />
                <ListText
                  title="Kembalian"
                  value={`Rp. ${formatNumber(data?.changePrice!)}`}
                />
              </VStack>
            </Card>
          </Card>
        </VStack>
      </ScrollView>
      <View className="absolute bottom-0 w-full bg-white shadow-sm pb-14 pt-5 px-5">
        <Button size="xl">
          <ButtonIcon as={PrinterIcon}/>
          <ButtonText>Cetak Invoice</ButtonText>
        </Button>
      </View>
    </View>
  );
}
