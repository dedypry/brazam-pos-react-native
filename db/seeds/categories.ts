import { db } from "..";
import { categorySchema, uomSchema } from "../schema";

export async function seedCategories() {
    try {
      const categories = [
        { id: 1, name: "All" },
        { id: 2, name: "Beverages" },
        { id: 3, name: "Food" },
        { id: 4, name: "Desserts" },
        { id: 5, name: "Pastries" },
      ];

      for (const category of categories) {
        await db
          .insert(categorySchema)
          .values(category)
          .onConflictDoUpdate({ target: categorySchema.id, set: category });
      }

      const uoms = ["Pcs", "Boks", "Liter", "Gram", "KG"];

      let id = 1;
      for (const uom of uoms) {
        await db
          .insert(uomSchema)
          .values({ id: id, name: uom })
          .onConflictDoUpdate({ target: uomSchema.id, set: { name: uom } });

        id++;
      }

      console.log("FINISH SEEDER")
    } catch (error) {
        console.error("ERROR", error)
    }

}
