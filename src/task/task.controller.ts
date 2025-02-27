import {
  Controller,
  Get,
  Delete,
  Param,
  Post,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '@prisma/client';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Task | null> {
    return this.taskService.getOne(id);
  }

  @Post(':id/complete')
  makeComplete(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.makeComplete(id);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.taskService.deleteTask(id);
  }
}
