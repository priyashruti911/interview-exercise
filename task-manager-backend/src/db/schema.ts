import { pgTable, serial, text, varchar, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";

// Enum for task status
export const taskStatusEnum = pgEnum('status', ['todo', 'in_progress', 'done']);
export const taskPriorityEnum = pgEnum('priority', ['low', 'medium', 'high']);

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 64 }).notNull().unique(),
  email: varchar('email', { length: 128 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const statusEnum = pgEnum('status', ['todo', 'in_progress', 'done']);
export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high']);

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  status: statusEnum('status').default('todo').notNull(),
  priority: priorityEnum('priority').default('medium').notNull(),
  projectId: integer('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
});


// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  ownerId: integer("owner_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
