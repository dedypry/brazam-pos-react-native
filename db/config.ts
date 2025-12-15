// db.ts
import ExpoSQLiteDialect from "@expo/knex-expo-sqlite-dialect";
import Knex from "knex";

// buka database

// custom driver untuk Knex
const knex = Knex({
  client: ExpoSQLiteDialect,
  connection: {
    filename: "mydb.db"
  },
  useNullAsDefault: true
});

export default knex;
