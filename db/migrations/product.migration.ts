import knex from "../config";

async function createTables() {
  const hasProducts = await knex.schema.hasTable("products");
  if (!hasProducts) {
    await knex.schema.createTable("products", (table) => {
      table.increments("id").primary();
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
      table.timestamps(true, true);
    });
    console.log("Table created!");
  }

  // await knex.schema.alterTable("products", (table) => {
    
  // });
  // console.log("ALTER CREATED")
}

export default createTables;
