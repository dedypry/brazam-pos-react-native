import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./slices/auth";
import cartReducer from "./slices/cart/cart-slice";
import productReducer from "./slices/product/product-slice";
import trxReducer from "./slices/transaction/transaction-slice";

// Gabungkan semua slice
const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  transaction: trxReducer,
});

// Config persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "cart"], // pilih reducer yang ingin disimpan
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // WAJIB dinonaktifkan untuk React Native
    }),
});

export const persistor = persistStore(store);

// Type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
