import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { db } from '../db/drizzle.js'; // adjust path if needed
import { projects } from '../db/schema.js';
import { CreateProjectDtoType } from './dto/create-project.dto.js';
import { eq, and } from 'drizzle-orm';

@Injectable()
export class ProjectsService {
    async create(dto: CreateProjectDtoType, userId: number) {
    console.log('Creating project:', dto, 'User ID:', userId);

    try {
        const [project] = await db.insert(projects).values({
        name: dto.name,
        description: dto.description,
        ownerId: userId,
        }).returning();

        return project;
    } catch (error) {
        console.error('Create project error:', error);
        throw new InternalServerErrorException('Failed to create project');
    }
    }

  async findAll(userId: number) {
    return db.select().from(projects).where(eq(projects.ownerId, userId));
  }

    async findOne(id: number, userId: number) {
    return await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.ownerId, userId)))
        .then(results => results[0]);
    }
}
