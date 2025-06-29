import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "shrutisharma",
  password: process.env.DB_PASSWORD || " ",
  database: process.env.DB_NAME || "taskmanager",
});

export const db = drizzle(pool);

