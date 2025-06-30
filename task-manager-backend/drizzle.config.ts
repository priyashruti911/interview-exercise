import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
    dbCredentials: {
        host: "localhost",
        port: 5432,
        user: "shrutisharma",
        password: " ",
        database: "taskmanager",
        ssl: false,
  },
} as any);

