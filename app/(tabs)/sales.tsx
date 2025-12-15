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
import knex from "@/db/config";
import { SalesModel } from "@/db/models/sales";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCart } from "@/store/slices/cart/cart-action";
import { handleRemoveItem } from "@/store/slices/cart/cart-slice";
import { setBarcode } from "@/store/slices/product/product-slice";
import { playScanSound } from "@/utils/helpers/sound";
import { router } from "expo-router";
import { BarcodeIcon, Plus, Receipt } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, useColorScheme, View } from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";
// import {} from "lodas/"

export default function SalesTab() {
  const { carts } = useAppSelector((state) => state.cart);
  const [isAddProduct, seAddProduct]=useState(false)
  const [isScanBarcode, setScanBarcode] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const lastScanRef = useRef(0);

  function scanOnce(val: string) {
    const now = Date.now();
    if (now - lastScanRef.current < 2000) return;

    lastScanRef.current = now;
    handleScan(val);
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const handleUpdateQuantity = (itemId: number, qty: number) => {
    if (qty <= 0) {
      dispatch(handleRemoveItem(itemId));
      return;
    }
  };

  async function handleRemove(id: number) {
    try {
      await knex("sales").where("id", id).del();
      dispatch(getCart());
    } catch (error) {
      console.error(error);
    }
  }

  async function handleScan(val: string) {
    console.log("DEBOUNDE", val);
    try {
      const product = await knex("products").where("barcode", val).first();
      await playScanSound();
      if (product) {
        const cart = await knex<SalesModel>("sales")
          .where("product_id", product.id)
          .first();

        if (cart) {
          await knex<SalesModel>("sales")
            .where("id", cart.id)
            .update({
              quantity: cart.quantity + 1,
            });
        } else {
          await knex<SalesModel>("sales").insert({
            product_id: product.id,
            quantity: 1,
            status:'pending'
          });
        }
        dispatch(getCart());
      }else{
        Alert.alert(
          "Produk belum terdaftar",
          "Silakan daftarkan produk terlebih dahulu",
          [
            {
              text: "Daftarkan Product",
              onPress: () => {
                dispatch(setBarcode(val))
                router.push("/pages/product/add")
              },
            },
          ]
        );

      }
      console.log("PRODUCT", product);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {isScanBarcode ? (
        <View className="h-48">
          <ScanBarcode onScan={scanOnce} />
        </View>
      ) : (
        <View className="pt-14 bg-white pb-4">
          <HeaderTitle
            gradient={["#45B7D1", "#4ECDC4"]}
            title="Sales"
            icon={Plus}
            subtitle={`1 items in inventory`}
            onPress={() => router.push("/product-modal")}
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
                    item={item}
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
      <ButtonComplete />
    </>
  );
}
