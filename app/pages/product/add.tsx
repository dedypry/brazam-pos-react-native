import FormNumberInput from "@/components/form/number-input";
import FormSelect from "@/components/form/select";
import FormTextArea from "@/components/form/text-area";
import FormTextInput from "@/components/form/text-input";
import AddCardButton from "@/components/products/add-card-button";
import {
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { InputSlot } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import knex from "@/db/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getProductDetail } from "@/store/slices/product/product-action";
import {
  removePhoto,
  resetPhotoProduct,
  setBarcode,
  setPhotoProducts,
} from "@/store/slices/product/product-slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  BarcodeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { createProductSchema } from "../../../schemas/product-schema";

export default function ProductAdd() {
  const { id, cameraBack } = useLocalSearchParams();
  const [isLoading, setLoading] = useState(false);
  const { photoProducts, categories, uoms, product, barcode } = useAppSelector(
    (state) => state.product
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id && !cameraBack) {
      dispatch(getProductDetail(id as any));
    }
  }, [id]);

  const dataCategories = categories
    .filter((e) => e.id !== "all")
    .map((e) => ({ label: e.name, value: e.id }));

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(createProductSchema),
    mode: "onChange",
  });

  useEffect(() => {
    setValue("photos", photoProducts);
  }, [photoProducts]);

  useEffect(() => {
    if (id && product) {
      if (!cameraBack) {
        dispatch(setPhotoProducts(product.photos));
      }
      setValue("name", product.name);
      setValue("price", product.price?.toString());

      setValue("modal", product.modal?.toString());
      setValue("category", product.category || "");
      setValue("uom", product.uom || "");
      setValue("description", product.description || "");

      setValue("sku", product?.sku || "");

      setValue("is_stock", product.is_stock === 1);
      setValue("is_product_show", product.is_product_show === 1);
      setValue("stock", product.stock?.toString());
      setValue("barcode",product?.barcode!)
    }
  }, [product]);

  useEffect(() => {
    if (barcode) {
      setValue("barcode", barcode);
    }
  }, [barcode]);

  async function onSubmit(data: any) {
    setLoading(true);
    const payload = {
      ...data,
      is_product_show: data.is_product_show ? 1 : 0,
      is_stock: data.is_stock ? 1 : 0,
      modal: Number(data.modal),
      photos: JSON.stringify(data.photos),
      price: Number(data.price),
    };
    try {
      if (id) {
        await knex("products").update(payload).where("id", id);
      } else {
        await knex("products").insert(payload);
      }
      dispatch(resetPhotoProduct());
      dispatch(setBarcode(""));
      reset();
      goBack();
    } catch (error) {
      console.error("ERROR", error);
    } finally {
      setLoading(false);
    }
  }

  function goBack() {
    router.replace(id ? `/pages/product/${id}` : "/(tabs)/products");
  }
  return (
    <View className="flex-1">
      <HStack className="pt-14 pb-4 px-5 items-center bg-white">
        <Pressable onPress={goBack}>
          <HStack className="items-center gap-2">
            <Icon as={ArrowLeft} size="xl" />
            <Heading>{id ? "Edit" : "Tambah"} Product</Heading>
          </HStack>
        </Pressable>
      </HStack>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card className="mt-2 px-5">
            <VStack className="gap-3">
              <View className="pb-2">
                <Heading size="sm" className="mb-1">
                  Photo Product
                </Heading>
                <Controller
                  control={control}
                  name="photos"
                  render={({ field }) => (
                    <VStack>
                      <HStack className="gap-4 flex-wrap">
                        {photoProducts.map((e, i) => (
                          <View key={i} className="relative">
                            <Image
                              source={{
                                uri: e,
                              }}
                              className="rounded-md w-20 h-20"
                              alt={`product-${i}`}
                            />
                            <TouchableOpacity
                              onPress={() => dispatch(removePhoto(e))}
                              className="absolute bg-red-500 p-0.5 rounded-full -right-2 -top-2"
                            >
                              <Icon
                                as={CloseIcon}
                                className="text-white"
                                size="sm"
                              />
                            </TouchableOpacity>
                          </View>
                        ))}
                        <View>
                          <AddCardButton id={id as any} />
                        </View>
                      </HStack>
                      {errors.photos && (
                        <Text className="text-error-500">
                          {errors.photos.message}
                        </Text>
                      )}
                    </VStack>
                  )}
                />
              </View>

              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <FormTextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    label="Nama Product"
                    isRequired
                    placeholder="Masukan Nama Product"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="price"
                render={({ field }) => (
                  <FormNumberInput
                    value={field.value}
                    label="Harga"
                    isRequired
                    placeholder="Masukan Harga Product"
                    isInvalid={!!errors.price}
                    errorMessage={errors.price?.message}
                    prefix={
                      <InputSlot className="pl-3">
                        <Text>Rp</Text>
                      </InputSlot>
                    }
                    onInput={field.onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="barcode"
                render={({ field }) => (
                  <FormTextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    label="Barcode"
                    isRequired
                    placeholder="Masukan Barcode"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                    suppix={
                      <InputSlot className="pr-1">
                        <Button
                          size="sm"
                          onPress={() =>
                            router.push("/pages/product/scan-barcode")
                          }
                        >
                          <ButtonIcon as={BarcodeIcon} size="lg" />
                          <ButtonText>Scan</ButtonText>
                        </Button>
                      </InputSlot>
                    }
                  />
                )}
              />
            </VStack>
          </Card>
          <Accordion className="mt-2" >
            <AccordionItem value="show">
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }: any) => (
                    <>
                      <AccordionTitleText>
                        Buat Produkmu lebih lengkap
                      </AccordionTitleText>
                      {isExpanded ? (
                        <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                      ) : (
                        <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                      )}
                    </>
                  )}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <AccordionContentText>
                  <VStack className="gap-4">
                    <Controller
                      control={control}
                      name="modal"
                      render={({ field }) => (
                        <FormNumberInput
                          value={field.value}
                          label="Modal"
                          placeholder="Masukan Modal"
                          prefix={
                            <InputSlot className="pl-3">
                              <Text>Rp</Text>
                            </InputSlot>
                          }
                          onInput={field.onChange}
                          textHelper="Modal tidak terlihat oleh pelanggan dan hanya digunakan untuk laporan keuanganmu."
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="category"
                      render={({ field }) => (
                        <FormSelect
                          selectedValue={field.value}
                          placeholder="Masukan Kategori Produk"
                          label="Kategori"
                          items={dataCategories}
                          onValueChange={field.onChange}
                          isInvalid={!!errors.category}
                          errorMessage={errors.category?.message}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="uom"
                      render={({ field }) => (
                        <FormSelect
                          selectedValue={field.value}
                          onValueChange={field.onChange}
                          placeholder="Masukan Satuan Produk"
                          label="Satuan"
                          isInvalid={!!errors.uom}
                          errorMessage={errors.uom?.message}
                          items={uoms as any}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="description"
                      render={({ field }) => (
                        <FormTextArea
                          value={field.value}
                          onChangeText={field.onChange}
                          label="Deskripsi Produk (Optional)"
                          maxLength={400}
                          placeholder="Masukan Deskripsi Produk"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="sku"
                      render={({ field }) => (
                        <FormTextInput
                          value={field.value}
                          onChangeText={field.onChange}
                          label="Kode barang/SKU (optional)"
                          placeholder="Masukan SKU Produk"
                        />
                      )}
                    />
                  </VStack>
                </AccordionContentText>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Card className="mt-2 px-5">
            <HStack className="justify-between items-center">
              <Text className="font-semibold">Stok</Text>
              <Controller
                control={control}
                name="is_stock"
                render={({ field }) => (
                  <Switch value={field.value} onToggle={field.onChange} />
                )}
              />
            </HStack>
            {watch("is_stock") && (
              <Controller
                control={control}
                name="stock"
                render={({ field }) => (
                  <FormNumberInput
                    value={field.value}
                    onInput={field.onChange}
                    label="Stok Awal"
                    placeholder="Masukan Stok Awal"
                    isInvalid={!!errors.stock}
                    errorMessage={errors.stock?.message}
                    isRequired
                  />
                )}
              />
            )}
          </Card>
          <Card className="mt-2 px-5 pb-10">
            <HStack className="justify-between items-center">
              <Text className="font-semibold">Tampilkan Product</Text>
              <Controller
                control={control}
                name="is_product_show"
                render={({ field }) => (
                  <Switch value={field.value} onToggle={field.onChange} />
                )}
              />
            </HStack>
            <Button
              isDisabled={isLoading}
              size="lg"
              className="mt-4"
              onPress={handleSubmit(onSubmit)}
            >
              {isLoading && <ButtonSpinner />}
              <ButtonText>
                {isLoading
                  ? "Sedang diproses..."
                  : `${id ? "Update" : "Simpan"} Product`}
              </ButtonText>
            </Button>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
