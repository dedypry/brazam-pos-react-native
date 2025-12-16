import { db } from "@/db";
import knex from "@/db/config";
import { productsSchema } from "@/db/schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { eq } from "drizzle-orm";

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
      const prod = await db.select().from(productsSchema).where(eq(productsSchema.id, id)).limit(1);
        return prod[0]
    } catch (error) {
        console.error(error)
    }
  }
);
