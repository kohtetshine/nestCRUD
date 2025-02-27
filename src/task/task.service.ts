import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  getTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  getOne(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  makeComplete(id: number): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { completed: true },
    });
  }

  async deleteTask(id: number): Promise<string> {
    await this.prisma.task.delete({
      where: { id },
    });
    return 'Task deleted successfully';
  }
}
