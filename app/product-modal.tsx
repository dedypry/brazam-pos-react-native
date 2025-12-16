import ProductCard from "@/components/products/product-card";
import SearchBar from "@/components/search-bar";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Grid, GridItem } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack";
import { db } from "@/db";
import { productsSchema, salesSchema } from "@/db/schema";
import { and, eq, InferSelectModel } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { router } from "expo-router";
import { X } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function ProductModal() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: products } = useLiveQuery(db.query.productsSchema.findMany());

  async function onAddToCart(
    product: InferSelectModel<typeof productsSchema>,
    selected: boolean
  ) {
    try {
      if (selected) {
        const salesData = await db.query.salesSchema.findFirst({
          where: (sales, { eq }) =>
            and(eq(sales.productId, product.id), eq(sales.status, "pending")),
        });

        if (salesData) {
          await db
            .update(salesSchema)
            .set({
              quantity: (salesData.quantity || 0) + 1,
              status: "pending",
            })
            .where(eq(salesSchema.id, salesData.id));
        } else {
          await db.insert(salesSchema).values({
            productId: product.id,
            quantity: 1,
            status: "pending",
          });
        }
      } else {
        await db
          .delete(salesSchema)
          .where(
            and(
              eq(salesSchema.productId, product.id),
              eq(salesSchema.status, "pending")
            )
          );
      }
      console.log("SUCCESS");
    } catch (error) {
      console.error("ERROR", error);
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
      <View className="absolute bottom-16 w-full">
        <Center className="px-10">
          <Button className="w-full" onPress={() => router.replace("/sales")}>
            <ButtonText>Checkout</ButtonText>
          </Button>
        </Center>
      </View>
    </View>
  );
}
