import { Injectable } from '@nestjs/common';
import { db } from '../db/drizzle.js';
import { projects } from '../db/schema.js';
import { CreateProjectDtoType } from './dto/create-project.dto.js';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class ProjectsService {
  async create(data: CreateProjectDtoType, userId: number) {
    const result = await db.insert(projects).values({
      name: data.name,
      description: data.description,
      ownerId: userId,
    }).returning();
    return result[0];
  }

  async findAll(userId: number) {
    return db.select().from(projects).where(eq(projects.ownerId, userId)
);
  }

  async findOne(id: number, userId: number) {
    const results = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, id), eq(projects.ownerId, userId)))
;
    return results[0];
  }
}
