import knex from "../config";
import createTableSales from "./sales.migration";

async function createTables() {
  const hasProducts = await knex.schema.hasTable("products");
  if (!hasProducts) {
    await knex.schema.createTable("products", (table) => {
      table.increments("id").primary();
      table.string("company_id").nullable();
      table.string("name").notNullable();
      table.string("price").notNullable();
      table.string("stock");
      table.boolean("is_stock").defaultTo(false);
      table.jsonb("photos").defaultTo([]);
      table.text("description").nullable();
      table.boolean("is_product_show").defaultTo(true);
      table.integer("modal").defaultTo(0);
      table.string("category").nullable();
      table.string("uom").nullable();
      table.string("sku").nullable();
      table.string("barcode").nullable();
      table.timestamp('deleted_at')
      table.timestamps(true, true);
    });
    console.log("Table created!");
  }

  await createTableSales()
  
  // await knex.schema.alterTable("products", (table) => {

  // });
  // console.log("ALTER CREATED")
}

export default createTables;
