import HeaderTitle from "@/components/header-title";
import ChipCategories from "@/components/products/chip-categories";
import ProductCard from "@/components/products/product-card";
import SearchBar from "@/components/search-bar";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Grid, GridItem } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { db } from "@/db";
import { productsSchema } from "@/db/schema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getProduct } from "@/store/slices/product/product-action";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { router } from "expo-router";
import { PackageX, Plus } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function ProductTab() {
  const { viewMode } = useAppSelector((state) => state.product);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollY = useSharedValue(0);

  const { data: products } = useLiveQuery(db.select().from(productsSchema));


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const headerAnimationStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, 60],
      [60, 0],
      Extrapolation.CLAMP
    );

    return { height };
  });
  const productStyle = useAnimatedStyle(() => {
    const top = interpolate(
      scrollY.value,
      [0, 100],
      [0, -100],
      Extrapolation.CLAMP
    );

    return { top: top };
  });

  return (
    <>
      <View className="bg-white pt-12 pb-3">
        <VStack>
          <Animated.View style={headerAnimationStyle}>
            <Animated.View
              style={[{ position: "absolute", width: "100%" }, productStyle]}
            >
              <HeaderTitle
                title="Product"
                icon={Plus}
                subtitle={`${products.length} items in inventory`}
                onPress={() => router.push("/pages/product/add")}
              />
            </Animated.View>
          </Animated.View>
          <VStack className="gap-2 px-5">
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search Product..."
            />

            <ChipCategories />
          </VStack>
        </VStack>
      </View>
      <Animated.ScrollView
        onScroll={onScroll}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        <Grid _extra={{ className: "grid-cols-2" }} className="gap-2 mt-5 px-5">
          {products.length > 0 ? (
            products.map((product, index) => (
              <GridItem
                key={product.id}
                _extra={{
                  className: viewMode === "grid" ? "col-span-1" : "col-span-2",
                }}
              >
                <ProductCard
                  product={product as any}
                  index={index}
                  viewMode={viewMode}
                  onPress={() => router.push(`/pages/product/${product.id}`)}
                />
              </GridItem>
            ))
          ) : (
            <Center className="flex-1 px-6 pt-20">
              <Box className="items-center gap-4">
                <Box className="bg-blue-100 p-5 rounded-full">
                  <Icon as={PackageX} size="xl" className="text-primary-300" />
                </Box>

                <Heading className="text-center">Produk Kosong</Heading>

                <Text className="text-center text-gray-500">
                  Belum ada produk yang tersedia. Tambahkan produk untuk mulai
                  berjualan.
                </Text>
              </Box>
            </Center>
          )}
        </Grid>
      </Animated.ScrollView>
    </>
    // </ScrollView>
  );
}
