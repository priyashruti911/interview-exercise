import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  ParseIntPipe,
  BadRequestException,
  UsePipes,
} from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto, type CreateTaskDtoType } from './dto/create-task.dto.js';
import {
  UpdateTaskStatusDtoType,
} from './dto/update-task-status.dto.js';
import { TypeboxValidationPipe } from '../common/pipes/typebox-validation.pipe.js';

@Controller('projects/:projectId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

   @Post()
    createTask(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() body: CreateTaskDtoType,
    ) {
    return this.tasksService.createTask(projectId, body);
}

  // Get tasks for a project with optional filters
  @Get()
  getTasks(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
  ) {
    const allowedStatuses = ['todo', 'in_progress', 'done'] as const;
    const allowedPriorities = ['low', 'medium', 'high'] as const;

    const typedStatus = allowedStatuses.includes(status as any)
      ? (status as typeof allowedStatuses[number])
      : undefined;

    const typedPriority = allowedPriorities.includes(priority as any)
      ? (priority as typeof allowedPriorities[number])
      : undefined;

    return this.tasksService.getTasks(projectId, {
      status: typedStatus,
      priority: typedPriority,
    });
  }

  //Update task status
  @Patch('/:taskId/status')
  @UsePipes(new TypeboxValidationPipe())
  updateStatus(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body()
    body: { status: 'todo' | 'in_progress' | 'done' },
  ) {
    return this.tasksService.updateTaskStatus(taskId, body.status);
  }

  // Update task priority (no DTO used)
  @Patch('/:taskId/priority')
  updatePriority(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body('priority') priority: string,
  ) {
    const allowedPriorities = ['low', 'medium', 'high'] as const;
    if (!allowedPriorities.includes(priority as any)) {
      throw new BadRequestException('Invalid priority value');
    }
    return this.tasksService.updateTaskPriority(
      taskId,
      priority as typeof allowedPriorities[number],
    );
  }

  //Delete task
  @Delete('/:taskId')
  deleteTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.tasksService.deleteTask(taskId);
  }
}
