import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export default sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("name"),
});
