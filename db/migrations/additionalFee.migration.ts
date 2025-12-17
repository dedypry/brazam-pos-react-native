import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { transactionSchema } from "../schema";

export default sqliteTable("additional_fee", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  price: real("price").notNull(),
  tansactionId: integer("transaction_id").references(() => transactionSchema.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s','now'))`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s','now'))`
  ),
});
