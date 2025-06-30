import { pgTable, serial, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: varchar("status", { enum: ['todo', 'in_progress', 'done'] }).notNull(),
  priority: varchar("priority", { enum: ['low', 'medium', 'high'] }).notNull(),
  projectId: integer("project_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
