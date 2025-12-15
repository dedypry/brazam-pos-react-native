import knex from "../config";


async function createTableSales() {
    const hasSales = await knex.schema.hasTable("sales");
    if (!hasSales) {
      await knex.schema.createTable("sales", (table) => {
        table.increments("id").primary();
        table.string("product_id").references("id").inTable("products");
        table.integer("quantity").defaultTo(1);
        table.string("status").defaultTo("pending");
        table.timestamps(true, true);
      });
      console.log("Table Sales created!");
    }
}

export default createTableSales