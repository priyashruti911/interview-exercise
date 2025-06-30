import { Injectable } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/drizzle.js';
import { tasks } from '../db/schema.js';
import { CreateTaskDtoType } from './dto/create-task.dto.js';

@Injectable()
export class TasksService {
  async createTask(projectId: number, data: CreateTaskDtoType) {
    return db.insert(tasks).values({
      ...data,
      projectId,
    });
  }

  async getTasks(
    projectId: number,
    filters: { status?: "todo" | "in_progress" | "done"; priority?: "low" | "medium" | "high" }
  ) {
    const where = and(
      eq(tasks.projectId, projectId),
      filters.status ? eq(tasks.status, filters.status) : undefined,
      filters.priority ? eq(tasks.priority, filters.priority) : undefined,
    );
    return db.select().from(tasks).where(where);
  }

  async updateTaskStatus(taskId: number, status: "todo" | "in_progress" | "done") {
    return db.update(tasks).set({ status }).where(eq(tasks.id, taskId));
  }

  async updateTaskPriority(taskId: number, priority: "low" | "medium" | "high") {
    return db.update(tasks).set({ priority }).where(eq(tasks.id, taskId));
  }

  async deleteTask(taskId: number) {
    return db.delete(tasks).where(eq(tasks.id, taskId));
  }
}
