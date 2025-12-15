import knex from "@/db/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCart = createAsyncThunk("ge-cart", async () => {
  try {
    const sales = await knex("sales").where("status", "pending");
    const productIds = sales.map((s) => s.product_id);

    const products = await knex("products").whereIn("id", productIds);

    const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

    const data = sales.map((s) => ({
      ...s,
      product: productMap[s.product_id]
        ? {
            ...productMap[s.product_id],
            photos: JSON.parse(productMap[s.product_id].photos),
          }
        : null,
    }));
    return data;
  } catch (error) {
    console.error(error);
  }
});
