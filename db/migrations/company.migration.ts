import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export default sqliteTable("companies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  logo: text("logo"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  description: text("name"),
});
