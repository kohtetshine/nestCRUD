import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }
  getTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  getOne(id: number): string {
    return `This action returns a #${id} task`;
  }

  deleteTask(id: number): string {
    return `This action removes a #${id} task`;
  }
}
