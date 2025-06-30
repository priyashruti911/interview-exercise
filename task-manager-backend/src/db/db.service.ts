import { Injectable } from '@nestjs/common';
import { db } from './client';
import { users } from './schema';

@Injectable()
export class DbService {
  async getUsers() {
    return await db.select().from(users);
  }
}
