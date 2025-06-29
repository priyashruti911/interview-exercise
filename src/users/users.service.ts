import { Injectable } from '@nestjs/common';
import { db } from '../db/client.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  async findAll() {
    return db.select().from(users);
  }

  async findByEmail(email: string) {
    const normalizedEmail = email.toLowerCase();
    const result = await db.select().from(users).where(eq(users.email, normalizedEmail)).limit(1);
    return result.length > 0 ? result[0] : null;
  }

  async create(userDto: { username: string; email: string; password: string }) {
    const passwordHash = await bcrypt.hash(userDto.password, 10);
    const normalizedEmail = userDto.email.toLowerCase();

    const [user] = await db
      .insert(users)
      .values({
        username: userDto.username,
        email: normalizedEmail,
        passwordHash,
      })
      .returning();

    return user;
  }
}
