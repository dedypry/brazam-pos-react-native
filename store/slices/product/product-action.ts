import knex from "@/db/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProduct = createAsyncThunk("get-product", async () => {
  try {
    const product = await knex("products");
    return product;
  } catch (error) {
    console.error(error);
  }
});

export const getProductDetail = createAsyncThunk(
  "get-product-detail",
  async (id: number) => {

    try {
        const prod = await knex("products").where("id", id).first();
        return prod
    } catch (error) {
        console.error(error)
    }
  }
);
