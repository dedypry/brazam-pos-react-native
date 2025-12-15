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
import knex from "@/db/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getProductDetail } from "@/store/slices/product/product-action";
import { formatNumber } from "@/utils/helpers/formater";
import { GlassView } from "expo-glass-effect";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeftIcon, Edit, Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { product } = useAppSelector((state) => state.product);

  const [isStock, setStock] = useState(product?.is_stock === 1);
  const [isShow, setShow] = useState(product?.is_product_show === 1);

  const progress = useSharedValue<number>(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id as any));
    }
  }, [id]);

  useEffect(()=>{
    if(product){
        setShow(product.is_product_show === 1)
        setStock(product.is_stock === 1)
    }
  },[product])

  async function update(index: string, value: boolean) {
    if (id) {
      await knex("products")
        .where("id", id)
        .update({
          [index]: value ? 1 : 0,
        })
        .then(()=>{
            console.log("SUCCESS UPDATE", index, id)
        })
        .catch(() => {
          if (index === "is_product_show") {
            setShow(!isShow);
          } else {
            setStock(!isStock);
          }
        });
      dispatch(getProductDetail(id as any));
    }
  }

  return (
    <View className="flex-1 bg-white">
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
            />
          </View>
        )}
        onProgressChange={(offsetProgress, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
      />
      <HStack className="pt-14 pb-4 px-5 absolute top-0 w-full justify-between items-center">
        <TouchableOpacity onPress={() => router.push("/(tabs)/products")}>
          <GlassView style={{ padding: 10, borderRadius: 100, zIndex: 50 }}>
            <Icon as={ChevronLeftIcon} size="xl" />
          </GlassView>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/pages/product/add",
              params: { id: product?.id },
            })
          }
        >
          <GlassView
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 100,
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
            glassEffectStyle="clear"
          >
            <Icon as={Edit} />
            <Text className="font-bold">Edit Product</Text>
          </GlassView>
        </TouchableOpacity>
      </HStack>
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
            value={isStock}
            onToggle={(val) => {
                setStock(val)
                update("is_stock", val);
            }}
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
            value={isShow}
            onToggle={(val) => {
                setShow(val)
                update("is_product_show", val);
            }}
          />
        </HStack>
      </VStack>
      <Divider className="my-3" />
      <VStack className="gap-2 mb-5">
        <ListText title="Categori" value={product?.category!} />
        <ListText title="SKU Number" value={product?.sku!} />
      </VStack>

      <Button variant="link" action="negative">
        <ButtonIcon as={Trash2} />
        <ButtonText>Hapus Product</ButtonText>
      </Button>
    </View>
  );
}
