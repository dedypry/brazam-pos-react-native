import ChipCategories from "@/components/products/chip-categories";
import ProductEmpty from "@/components/products/product-empty";
import SearchBar from "@/components/search-bar";
import ProductCard from "@/components/transactions/product-card";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { db } from "@/db";
import { salesSchema } from "@/db/schema";
import { colors } from "@/utils/configs/colors";
import { and, count, eq, isNotNull } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { router } from "expo-router";
import { ListCheck } from "lucide-react-native";
import { useMemo, useState } from "react";
import { FlatList, View } from "react-native";

export default function TransactionPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allProducts } = useLiveQuery(
    db.query.productsSchema.findMany()
  );
  const { data: trxItems } = useLiveQuery(
    db
      .select({ count: count() })
      .from(salesSchema)
      .where(
        and(eq(salesSchema.status, "pending"), isNotNull(salesSchema.productId))
      )
  );

  const trxItem = trxItems?.[0];

  const products = useMemo(() => {
    if (!allProducts) return [];
    if (!searchQuery) return allProducts;

    const q = searchQuery.toLowerCase();

    return allProducts.filter((p) => p.name.toLowerCase().includes(q));
  }, [allProducts, searchQuery]);

  return (
    <View className="flex-1">
      <VStack className="gap-2 px-2 pb-5">
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search Product..."
        />
        <ChipCategories />
      </VStack>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ProductCard key={index} product={item} />
        )}
        ListEmptyComponent={<ProductEmpty backUrl="/pages/transaction" />}
        contentContainerStyle={{
          paddingTop: 5,
          paddingHorizontal: 5,
        }}
      />

      <View className="absolute bottom-0 w-full bg-white shadow-sm pb-14 pt-5 px-5">
        <Button
          size="xl"
          onPress={() => router.push("/pages/orders")}
          disabled={trxItem?.count < 1}
          action={trxItem?.count < 1 ? "secondary" : "primary"}
        >
          <ListCheck
            color={trxItem?.count < 1 ? colors.secondary : colors.white}
          />
          <ButtonText>Daftar Pesanan</ButtonText>
        </Button>
      </View>
    </View>
  );
}
