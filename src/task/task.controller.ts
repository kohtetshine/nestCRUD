import { Controller, Get, Delete, Param, Post, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  getTasks() {
    return this.taskService.getTasks();
  }

  @Get(':id')
  getOne(@Param('id') id: number): string {
    return this.taskService.getOne(id);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number): string {
    return this.taskService.deleteTask(id);
  }
}
