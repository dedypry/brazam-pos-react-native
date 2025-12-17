import ConfirmAlert from "@/components/confirm-alert";
import ListText from "@/components/list-text";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { db } from "@/db";
import { productsSchema } from "@/db/schema";
import { formatNumber } from "@/utils/helpers/formater";
import { eq, InferSelectModel } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeftIcon, Edit, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;

export default function ProductDetail() {
  const { id } = useLocalSearchParams();

  const { data } = useLiveQuery(
    db
      .select()
      .from(productsSchema)
      .where(eq(productsSchema.id, Number(id)))
      .limit(1)
  );

  const product: InferSelectModel<typeof productsSchema> | null =
    data.length > 0 ? data[0] : null;

  const [showAlert, setShowAlert] = useState(false);

  const progress = useSharedValue<number>(0);

  async function update(index: string, value: boolean) {
    if (id) {
      await db.update(productsSchema).set({
        [index]: value,
      })
      .where(eq(productsSchema.id, id as any));
    }
  }

  async function handleDelete() {
    await db
      .delete(productsSchema)
      .where(eq(productsSchema.id, id as any))
      .then(() => {
        console.log("SUCCESS");
        router.replace("/products");
      });
  }

  return (
    <View className="flex-1 bg-white">
      <ConfirmAlert
        show={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={handleDelete}
      />
      <Carousel
        loop={product?.photos?.length! > 1}
        width={width}
        height={360}
        autoPlay={false}
        data={product?.photos!}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View className="w-full ">
            <Image
              source={{ uri: item }}
              resizeMode="cover"
              className="w-full h-full"
              alt="Image"
            />
          </View>
        )}
        onProgressChange={(offsetProgress, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
      />
      <HStack className="pt-14 pb-4 px-5 absolute top-0 w-full justify-between items-center">
        <TouchableOpacity onPress={() => router.push("/(tabs)/products")}>
          <View className="p-2 bg-white/50" style={{ borderRadius: 100 }}>
            <Icon as={ChevronLeftIcon} size="xl" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/pages/product/add",
              params: { id: product?.id },
            })
          }
        >
          <View
            className="bg-warning-500/90"
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 100,
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <Icon as={Edit} className="text-white" />
            <Text className="font-bold text-white">Edit Product</Text>
          </View>
        </TouchableOpacity>
      </HStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        <VStack className="mt-5 px-5 gap-2">
          <Heading size="lg" className="font-semibold">
            {product?.name}
          </Heading>
          <Text className="font-semibold">
            Rp {formatNumber(product?.price!)} /{product?.uom}{" "}
          </Text>

          <Text className="font-semibold">
            Stok {formatNumber(product?.stock!)}
          </Text>

          <Text>{product?.description || "Tidak ada deskripsi"}</Text>
        </VStack>
        <Divider className="my-3" />
        <VStack className="px-5 gap-4">
          <HStack className="justify-between">
            <VStack className="gap-2 flex-1">
              <Heading size="lg" className="font-semibold">
                Ketersediaan Produk
              </Heading>
              <Text>Kelola ketersediaan produk di BrazamPos</Text>
            </VStack>
            <Switch
              value={product?.isStock}
              onToggle={(val) => update("isStock", val)}
            />
          </HStack>
          <HStack className="justify-between">
            <VStack className="gap-2 flex-1">
              <Heading size="lg" className="font-semibold">
                Tampilkan di Microsite
              </Heading>
              <Text>
                Tampilkan produk ini di katalog online agar pelanggan dapat
                melihatnya secara online
              </Text>
            </VStack>
            <Switch
              value={product?.isProductShow}
              onToggle={(val) => update("isProductShow", val)}
            />
          </HStack>
        </VStack>
        <Divider className="my-3" />
        <VStack className="gap-2 mb-5">
          <ListText title="Categori" value={product?.category!} />
          <ListText title="SKU Number" value={product?.sku!} />
        </VStack>

        <Button
          variant="link"
          action="negative"
          onPress={() => setShowAlert(true)}
        >
          <ButtonIcon as={Trash2} />
          <ButtonText>Hapus Product</ButtonText>
        </Button>
      </ScrollView>
    </View>
  );
}
