import { IProduct } from "@/utils/interfaces/product";
import { createSlice } from "@reduxjs/toolkit";
import { getProduct, getProductDetail } from "./product-action";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    viewMode: "grid" as "list" | "grid",
    selectedCategory: "all",

    categories: [
      { id: "all", name: "All", color: "#FF6B6B" },
      { id: "beverages", name: "Beverages", color: "#4ECDC4" },
      { id: "food", name: "Food", color: "#45B7D1" },
      { id: "desserts", name: "Desserts", color: "#96CEB4" },
      { id: "pastries", name: "Pastries", color: "#FECA57" },
    ],
    products: [] as IProduct[],
    photoProducts: [] as string[],
    uoms: ["Pcs", "Boks", "Liter", "Gram", "KG"],
    product: null as IProduct | null
  },
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
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
    builder.addCase(
      getProduct.fulfilled,
      (state, action) => {
        state.products = action.payload?.map((e)=>({
          ...e,
          photos: JSON.parse(e.photos)
        })) ?? [];
      }
    )
    .addCase(getProductDetail.fulfilled,(state, action)=>{
      state.product = {
        ...action.payload,
        photos: JSON.parse(action.payload.photos),
      };
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
} = productSlice.actions;
export default productSlice.reducer;
