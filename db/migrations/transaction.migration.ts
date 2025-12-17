import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export default sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  companyId: integer("company_id"),
  trxNo: text("trx_no").notNull(),
  discount: real("discount").notNull().default(0),
  subtotal: real("subtotal").notNull().default(0),
  totalPrice: real("total_price").notNull().default(0),
  paymentPrice: real("payment_price").notNull().default(0),
  changePrice: real("change_price").notNull().default(0),
  customerId: integer("customer_id"),
  note: text("note"),
  paymentMethod: text("payment_method"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s','now'))`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s','now'))`
  ),
});
