import ProductCard from "@/components/products/product-card";
import SearchBar from "@/components/search-bar";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Grid, GridItem } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack";
import knex from "@/db/config";
import { SalesModel } from "@/db/models/sales";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCart } from "@/store/slices/cart/cart-action";
import { getProduct } from "@/store/slices/product/product-action";
import { IProduct } from "@/utils/interfaces/product";
import { router } from "expo-router";
import { X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export default function ProductModal() {
  const { products } = useAppSelector((state) => state.product);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  async function onAddToCart(product: IProduct, selected: boolean) {
    try {
      if (selected) {
        const salesData = await knex<SalesModel>("sales")
          .where("product_id", product.id)
          .first();

        if (salesData) {
          await knex<SalesModel>("sales")
            .where("product_id", product.id)
            .update({
              quantity: salesData.quantity + 1,
              status: "pending",
            });
        } else {
          await knex<SalesModel>("sales").insert({
            product_id: product.id,
            quantity: 1,
            status: "pending",
          });
        }
      } else {
        await knex("sales").where("id", product.id).del();
      }
      console.log("SUCCESS");
    } catch (error) {
      console.error("ERROR", error);
    }finally{
      dispatch(getCart())
    }
  }
  return (
    <View className="flex-1">
      <VStack className="px-5 gap-2 pt-10">
        <HStack className="justify-between pt-6 pb-2">
          <Heading>Add Product</Heading>
          <Pressable onPress={() => router.replace("/sales")}>
            <X />
          </Pressable>
        </HStack>

        <SearchBar
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="bg-gray-200"
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Grid _extra={{ className: "grid-cols-2" }} className="gap-2">
            {products.map((product, index) => (
              <GridItem key={product.id} _extra={{ className: "col-span-1" }}>
                <ProductCard
                  product={product}
                  index={index}
                  onPress={(selected) => onAddToCart(product, selected)}
                  isSales
                />
              </GridItem>
            ))}
          </Grid>
        </ScrollView>
      </VStack>
      <View className="absolute bottom-10 w-full">
        <Center className="px-10">
          <Button className="w-full" onPress={() => router.replace("/sales")}>
            <ButtonText>Checkout</ButtonText>
          </Button>
        </Center>
      </View>
    </View>
  );
}
