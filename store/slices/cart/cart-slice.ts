import { IProductItem } from "@/utils/interfaces/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IBodyCartItem {
  itemId: number;
  qty: number;
}
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [] as IProductItem[],
  },
  reducers: {
    setCart: (state, action) => {
      state.carts = action.payload;
    },
    createCart: (state, action: PayloadAction<IProductItem>) => {
      const item = action.payload
      const find = state.carts.findIndex((e)=> e.id === item.id)

      if(find >=0){
        state.carts[find] = {
          ...item,
          quantity: state.carts[find].quantity + item.quantity,
        };
      }else{
        state.carts = [...state.carts, item]
      }
      console.log("ITEM", state.carts);
    },
    setCartItems: (state, action: PayloadAction<IBodyCartItem>) => {
      const { itemId, qty } = action.payload;
      const payload = state.carts.map((item) =>
        item.id === itemId ? { ...item, quantity: qty } : item
      );

      state.carts = payload;
    },
    handleRemoveItem: (state, action) => {
      state.carts = state.carts.filter((e) => e.id !== action.payload);
    },
  },
});

export const { setCart, setCartItems, handleRemoveItem, createCart } =
  cartSlice.actions;
export default cartSlice.reducer;
