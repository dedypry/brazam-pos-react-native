import ProductCard from "@/components/products/product-card";
import SearchBar from "@/components/search-bar";
import { Grid, GridItem } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createCart } from "@/store/slices/cart/cart-slice";
import { IProduct } from "@/utils/interfaces/product";
import { router } from "expo-router";
import { X } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, useColorScheme } from "react-native";

export default function ProductModal() {
  const { products } = useAppSelector((state) => state.product);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function onClose() {
    router.back();
  }

  function onAddToCart(product: IProduct) {
    console.log(product);
    dispatch(
      createCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
      })
    );
  }
  return (
    <VStack className="px-5 gap-2 mt-2">
      <HStack className="justify-between pt-14">
        <Heading>Add Product</Heading>
        <Pressable onPress={()=>router.back()}>
          <X />
        </Pressable>
      </HStack>
      <SearchBar
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Grid _extra={{ className: "grid-cols-2" }} className="gap-2">
          {filteredProducts.map((product, index) => (
            <GridItem key={product.id} _extra={{ className: "col-span-1" }}>
              <ProductCard
                product={product}
                index={index}
                onPress={() => onAddToCart(product)}
              />
            </GridItem>
          ))}
        </Grid>
      </ScrollView>
    </VStack>
  );
}
