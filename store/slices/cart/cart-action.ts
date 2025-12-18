import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCart = createAsyncThunk("ge-cart", async () => {
  try {
    return [];
  } catch (error) {
    console.error(error);
  }
});
