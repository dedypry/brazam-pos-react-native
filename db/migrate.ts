import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "./drizzle/migrations";
import { db } from "./index";
import { runSeed } from "./seeds";

export async function runMigrations() {
  await migrate(db, migrations);
  runSeed()
}
