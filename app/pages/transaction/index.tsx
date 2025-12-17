import ProductEmpty from "@/components/products/product-empty";
import { db } from "@/db";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { FlatList, View } from "react-native";
import ProductCard from "../../../components/transactions/product-card";

export default function TransactionPage() {
  const { data: products } = useLiveQuery(db.query.productsSchema.findMany());
  return (
    <View className="flex-1">
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ProductCard key={index} product={item} />
        )}
        ListEmptyComponent={<ProductEmpty backUrl="/pages/transaction" />}
        contentContainerStyle={{
          gap: 5,
          paddingTop: 5,
          paddingHorizontal: 5,
        }}
      />
    </View>
  );
}
