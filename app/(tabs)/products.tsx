import HeaderTitle from "@/components/header-title";
import ChipCategories from "@/components/products/chip-categories";
import ProductCard from "@/components/products/product-card";
import SafeArea, { SafeBackground } from "@/components/safe-area";
import SearchBar from "@/components/search-bar";
import { Grid, GridItem } from "@/components/ui/grid";
import { useAppSelector } from "@/store/hooks";
import { LinearGradient } from "expo-linear-gradient";
import { Plus } from "lucide-react-native";
import { useState } from "react";
import { useColorScheme, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function ProductTab() {
  const { products, viewMode } = useAppSelector((state) => state.product);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollY = useSharedValue(0);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      console.log("SCROLL", e.contentOffset.y);
      scrollY.value = e.contentOffset.y;
    },
  });

  const headerAnimationStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [82, 120],
      [0, 60],
      Extrapolation.CLAMP
    );

    console.log("heigh", height);
    return { paddingTop: height };
  });

  const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

  return (
    <>
      <SafeArea />
      <Animated.ScrollView
        onScroll={onScroll}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        <SafeBackground noPadding>
          <HeaderTitle
            title="Product"
            icon={Plus}
            subtitle={`${products.length} items in inventory`}
            onPress={() => {}}
          />
        </SafeBackground>

        <View>
          <LinearGradient
            colors={
              isDark
                ? [
                    "rgba(0,0,0,1)", // atas lebih gelap
                    "rgba(0,0,0,0)", // bawah lebih terang
                  ]
                : [
                    "rgba(255,255,255,1)", // atas putih pekat
                    "rgba(255,255,255,0)", // bawah transparan
                  ]
            }
            style={{
              gap: 5,
              paddingTop: 20,
              paddingHorizontal: 20,
            }}
          >
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search Product..."
            />

            <ChipCategories />
          </LinearGradient>
          {/* <Animated.View style={headerAnimationStyle}>
            <VStack className="gap-4">
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search Product..."
              />

              <ChipCategories />
            </VStack>
          </Animated.View> */}
          {/* <ChipCategories /> */}
        </View>
        {/* <View>
        <Animated.View>
        </Animated.View>
      </View> */}

        <Grid _extra={{ className: "grid-cols-2" }} className="gap-2 mt-5 px-5">
          {products.map((product, index) => (
            <GridItem
              key={product.id}
              _extra={{
                className: viewMode === "grid" ? "col-span-1" : "col-span-2",
              }}
            >
              <ProductCard
                product={product}
                index={index}
                viewMode={viewMode}
              />
            </GridItem>
          ))}
        </Grid>
        <Grid _extra={{ className: "grid-cols-2" }} className="gap-2 mt-5 px-5">
          {products.map((product, index) => (
            <GridItem
              key={product.id}
              _extra={{
                className: viewMode === "grid" ? "col-span-1" : "col-span-2",
              }}
            >
              <ProductCard
                product={product}
                index={index}
                viewMode={viewMode}
              />
            </GridItem>
          ))}
        </Grid>
      </Animated.ScrollView>
    </>
    // </ScrollView>
  );
}
