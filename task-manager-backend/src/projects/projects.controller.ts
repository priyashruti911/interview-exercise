import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  UsePipes,
} from '@nestjs/common';
import { ProjectsService } from './projects.service.js';
import { JwtAuthGuard } from '../auth/jwt.guard.js';
import { TypeboxValidationPipe } from '../common/pipes/typebox-validation.pipe.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import type { CreateProjectDtoType } from './dto/create-project.dto.js';


@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UsePipes(new TypeboxValidationPipe())
  async create(
    @Body() body: CreateProjectDtoType,
    @Req() req: any,
  ) {
    return this.projectsService.create(body, req.user.id);
  }

  @Get()
  async findAll(@Req() req: any) {
    return this.projectsService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    return this.projectsService.findOne(parseInt(id), req.user.id);
  }
}
