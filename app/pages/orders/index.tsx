import ButtonDashed from "@/components/button-dashed";
import LayoutHeader from "@/components/layouts/header";
import ModalDiscount from "@/components/orders/modal-discount";
import ModalOther from "@/components/orders/modal-other";
import ProductEmpty from "@/components/products/product-empty";
import ProductCard from "@/components/transactions/product-card";
import { Button, ButtonText } from "@/components/ui/button";
import { Grid, GridItem } from "@/components/ui/grid";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { db } from "@/db";
import { useAppSelector } from "@/store/hooks";
import { colors } from "@/utils/configs/colors";
import { formatNumber } from "@/utils/helpers/formater";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { router } from "expo-router";
import {
  BanknoteArrowUp,
  TagsIcon,
  TicketPercentIcon,
} from "lucide-react-native";
import { useState } from "react";
import { FlatList, View } from "react-native";

export default function OrderList() {
  const { transaction } = useAppSelector((state) => state.transaction);
  const [showDiscount, setShowDiscount] = useState(false);
  const [showFee, setShowFee] = useState(false);
  const { data } = useLiveQuery(
    db.query.salesSchema.findMany({
      where: (sales, { eq, and, isNotNull }) =>
        and(eq(sales.status, "pending"), isNotNull(sales.productId)),
      with: {
        product: true,
      },
    })
  );

  const subtotal = data.reduce((sum, item) => sum + item.totalPrice, 0);
  const additionalFee = transaction.additionFee.reduce(
    (sum, item) => sum + Number((item as any)?.fee || 0),
    0
  );
  const totalPrice = Number(subtotal) + additionalFee;

  let grandTotal = 0;

  if (transaction.discount > 0) {
    if (transaction.discountType === "idr") {
      grandTotal = totalPrice - transaction.discount;
    } else {
      grandTotal = (totalPrice * transaction.discount) / 100;
    }
  }

  return (
    <View className="flex-1 bg-white">
      <ModalOther setShow={setShowFee} show={showFee} />
      <ModalDiscount show={showDiscount} setShow={setShowDiscount} />
      <LayoutHeader title="Daftar Pesanan" goBack />
      <FlatList
        data={data.map((e) => e.product)}
        keyExtractor={(item) => item?.id?.toString() ?? ""}
        renderItem={({ item, index }) => (
          <ProductCard key={index} product={item!} isDelete />
        )}
        ListEmptyComponent={<ProductEmpty backUrl="/pages/transaction" />}
        contentContainerStyle={{
          paddingTop: 15,
          paddingHorizontal: 5,
        }}
      />
      <View className="absolute bottom-0 w-full bg-white shadow-sm pb-14 pt-5 px-5">
        <Grid _extra={{ className: "grid-cols-2" }} className="gap-5 pb-5">
          <GridItem _extra={{ className: "" }}>
            <ButtonDashed
              title={`Diskon ${
                transaction?.discount > 0
                  ? "Rp " + formatNumber(transaction?.discount)
                  : ""
              }`}
              icon={TagsIcon}
              onPress={() => setShowDiscount(true)}
              isActive={transaction?.discount > 0}
            />
          </GridItem>
          <GridItem _extra={{ className: "" }}>
            <ButtonDashed
              title="Lain-lain"
              icon={TicketPercentIcon}
              onPress={() => setShowFee(true)}
              isActive={transaction.additionFee.length > 0}
              total={transaction.additionFee.length}
            />
          </GridItem>
        </Grid>

        <HStack className="justify-between items-center pb-3">
          <Text>Total Order ({data.length})</Text>
          <Text className="font-semibold" size="lg">
            Rp {formatNumber(grandTotal)}
          </Text>
        </HStack>
        <Button
          size="xl"
          onPress={() => router.push("/pages/receive-payment")}
          disabled={data?.length < 1}
          action={data?.length < 1 ? "secondary" : "primary"}
        >
          <BanknoteArrowUp
            color={data?.length < 1 ? colors.secondary : colors.white}
          />
          <ButtonText>Lanjutkan Pembayaran</ButtonText>
        </Button>
      </View>
    </View>
  );
}
