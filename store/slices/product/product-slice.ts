import { IProduct } from "@/utils/interfaces/product";
import { createSlice } from "@reduxjs/toolkit";

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
    products: [
      {
        id: 1,
        name: "Premium Coffee",
        category: "Beverages",
        price: "12.99",
        stock: 45,
        image:
          "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=300&fit=crop",
      },
      {
        id: 2,
        name: "Chocolate Cake",
        category: "Desserts",
        price: "24.50",
        stock: 8,
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop",
      },
      {
        id: 3,
        name: "Green Tea",
        category: "Beverages",
        price: "8.75",
        stock: 32,
        image:
          "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop",
      },
      {
        id: 4,
        name: "Croissant",
        category: "Pastries",
        price: "4.25",
        stock: 15,
        image:
          "https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=300&h=300&fit=crop",
      },
      {
        id: 5,
        name: "Sandwich",
        category: "Food",
        price: "8.90",
        stock: 22,
        image:
          "https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=300&h=300&fit=crop",
      },
      {
        id: 6,
        name: "Fresh Juice",
        category: "Beverages",
        price: "6.50",
        stock: 18,
        image:
          "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop",
      },
    ] as IProduct[],
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
  },
});

export const { setProduct, setViewMode, setSelectedCategory } =
  productSlice.actions;
export default productSlice.reducer;
