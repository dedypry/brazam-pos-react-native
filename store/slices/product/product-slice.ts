import { productsSchema } from "@/db/schema";
import { IProduct } from "@/utils/interfaces/product";
import { createSlice } from "@reduxjs/toolkit";
import { InferSelectModel } from "drizzle-orm";
import { getProduct, getProductDetail } from "./product-action";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    viewMode: "grid" as "list" | "grid",
    selectedCategory: 1,
    barcode: "",
    categories: [],
    products: [] as IProduct[],
    photoProducts: [] as string[],
    uoms: ["Pcs", "Boks", "Liter", "Gram", "KG"],
    product: null as InferSelectModel<typeof productsSchema> | null,
  },
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },
    setBarcode: (state, action) => {
      state.barcode = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setPhotoProducts: (state, action) => {
      state.photoProducts = action.payload;
    },
    setPhotoProduct: (state, action) => {
      state.photoProducts = [...state.photoProducts, action.payload];
    },
    removePhoto: (state, action) => {
      state.photoProducts = state.photoProducts.filter(
        (photo) => photo !== action.payload
      );
    },
    resetPhotoProduct: (state) => {
      state.photoProducts = [];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getProduct.fulfilled, (state, action) => {
        state.products =
          action.payload?.map((e) => ({
            ...e,
            photos: JSON.parse(e.photos),
          })) ?? [];
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.product = action.payload as any
      }),
});

export const {
  setProduct,
  setViewMode,
  setSelectedCategory,
  setPhotoProduct,
  removePhoto,
  resetPhotoProduct,
  setPhotoProducts,
  setBarcode,
} = productSlice.actions;
export default productSlice.reducer;
