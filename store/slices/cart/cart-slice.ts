import { ISales } from "@/utils/interfaces/product";
import { createSlice } from "@reduxjs/toolkit";
import { getCart } from "./cart-action";

interface IBodyCartItem {
  itemId: number;
  qty: number;
}
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [] as ISales[],
  },
  reducers: {
    setCart: (state, action) => {
      state.carts = action.payload;
    },

    handleRemoveItem: (state, action) => {
      state.carts = state.carts.filter((e) => e.product.id !== action.payload);
    },
  },
  extraReducers: (builder) =>
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.carts = action.payload || [];
    }),
});

export const { setCart, handleRemoveItem } = cartSlice.actions;
export default cartSlice.reducer;
