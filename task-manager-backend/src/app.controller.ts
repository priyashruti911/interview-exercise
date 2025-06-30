import { Controller, Get } from '@nestjs/common';
import { DbService } from './db/db.service';

@Controller()
export class AppController {
  constructor(private readonly dbService: DbService) {}

  @Get()
  getRoot() {
    return { message: 'Welcome to Project Task Manager API' };
  }

  @Get('users')
  async getUsers() {
    const users = await this.dbService.getUsers();
    return users;
  }
}
