import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { productsSchema, transactionSchema } from "../schema";

export default sqliteTable("sales", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  transactionId: integer("transaction_id").references(
    () => transactionSchema.id
  ),
  productId: integer("product_id").references(() => productsSchema.id),
  quantity: integer("quantity").default(1),
  status: text("status").default("pending"),
  price: real("price").default(0),
  totalPrice: real("total_price").notNull(),
  note: text("note"),
  type: text("type"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s','now'))`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s','now'))`
  ),
});
