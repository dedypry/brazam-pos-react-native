import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export default sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  companyId: text("company_id"),

  name: text("name").notNull(),
  price: real("price").notNull(),

  stock: real("stock"),
  isStock: integer("is_stock", { mode: "boolean" }).notNull().default(false),

  photos: text("photos", { mode: "json" })
    .$type<string[]>()
    .default(sql`'[]'`),

  description: text("description"),

  isProductShow: integer("is_product_show", { mode: "boolean" })
    .notNull()
    .default(true),

  modal: integer("modal").default(0),

  category: text("category"),
  uom: text("uom"),
  sku: text("sku"),
  barcode: text("barcode"),

  deletedAt: integer("deleted_at", { mode: "timestamp" }),

  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s','now'))`
  ),

  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s','now'))`
  ),
});
