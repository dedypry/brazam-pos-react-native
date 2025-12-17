import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export default sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  companyId: integer("company_id"),
  trx_no: text("trx_no").notNull(),
  discount: real("discount").notNull(),
  total_price: real("total_price").notNull(),
  customer_id: integer("customer_id"),
  note: text("note"),
  payment_method: text("payment_method"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s','now'))`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s','now'))`
  ),
});
