import ButtonComplete from "@/components/carts/button-complete";
import CartItem from "@/components/carts/cart-item";
import HeaderTitle from "@/components/header-title";
import ScanBarcode from "@/components/scan-barcode";
import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonText,
} from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { db } from "@/db";
import { salesSchema } from "@/db/schema";
import { useAppDispatch } from "@/store/hooks";
import { handleRemoveItem } from "@/store/slices/cart/cart-slice";
import { setBarcode } from "@/store/slices/product/product-slice";
import { playScanSound } from "@/utils/helpers/sound";
import { and, eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { router } from "expo-router";
import { BarcodeIcon, Plus, Receipt } from "lucide-react-native";
import { useRef, useState } from "react";
import { Alert, ScrollView, useColorScheme, View } from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";
// import {} from "lodas/"

export default function SalesTab() {
  const [isScanBarcode, setScanBarcode] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const lastScanRef = useRef(0);

  const { data: carts } = useLiveQuery(
    db.query.salesSchema.findMany({
      where: (sales, { eq }) => eq(sales.status, "pending"),
      with: {
        product: true,
      },
    })
  );


  function scanOnce(val: string) {
    const now = Date.now();
    if (now - lastScanRef.current < 2000) return;

    lastScanRef.current = now;
    handleScan(val);
  }

  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (itemId: number, qty: number) => {
    if (qty <= 0) {
      dispatch(handleRemoveItem(itemId));
      return;
    }
  };

  async function handleRemove(id: number) {
    try {
      await db.delete(salesSchema).where(eq(salesSchema.id,id))
    } catch (error) {
      console.error(error);
    }
  }

  async function handleScan(val: string) {
    try {
      const product = await db.query.productsSchema.findFirst({
        where: (products, { eq }) => eq(products.barcode, val),
      });

      await playScanSound();
      if (product) {
        const cart = await db.query.salesSchema.findFirst({
          where: (sales, { eq }) =>
            and(eq(sales.status, "pending"), eq(sales.productId, product.id)),
        });

        if (cart) {
          await db.update(salesSchema).set({
            quantity: (cart.quantity || 0) + 1,
          })
          .where(eq(salesSchema.id, cart.id));
        } else {
          await db.insert(salesSchema).values({
            productId: product.id,
            quantity: 1,
            status: "pending",
          } as any);
        }
      } else {
        Alert.alert(
          "Produk belum terdaftar",
          "Silakan daftarkan produk terlebih dahulu",
          [
            {
              text: "Batal",
              style: "cancel",
              onPress: () => {
                console.log("Cancel");
              },
            },
            {
              text: "Daftarkan Product",
              onPress: () => {
                dispatch(setBarcode(val));
                router.push("/pages/product/add");
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {isScanBarcode ? (
        <View className="h-48">
          <ScanBarcode onScan={scanOnce} onClose={()=> setScanBarcode(false)} />
        </View>
      ) : (
        <View className="pt-14 bg-white pb-4">
          <HeaderTitle
            gradient={["#45B7D1", "#4ECDC4"]}
            title="Sales"
            subtitle={`${carts.length} items in inventory`}
            actions={
              <HStack>
                <Button size="sm" onPress={() => setScanBarcode(true)}>
                  <ButtonIcon as={BarcodeIcon} />
                  <ButtonText>Scan Barcode</ButtonText>
                </Button>
              </HStack>
            }
          />
        </View>
      )}

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
                    item={item as any}
                    index={index}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={(id) => handleRemove(id)}
                  />
                ))}
              </View>

              {/* Checkout Summary */}
            </>
          )}
        </View>
      </ScrollView>
      <ButtonComplete carts={carts as any} />
    </>
  );
}
