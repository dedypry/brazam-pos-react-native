import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { productsSchema } from "../schema";


export default sqliteTable("sales", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  productId: integer("product_id").references(() => productsSchema.id),

  quantity: integer("quantity").default(1),
  status: text("status").default("pending"),

  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s','now'))`
  ),

  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s','now'))`
  ),
});
