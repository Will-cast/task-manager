import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { Task } from './entities/task.entity';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository,
  ) {}

  create(createTaskDto: CreateTaskDto): Task {
    const user = this.userRepository.findOne(createTaskDto.AssigneeUserId);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createTaskDto.AssigneeUserId} not found`,
      );
    }
    return this.taskRepository.create(createTaskDto, user);
  }

  findAll(): Task[] {
    return this.taskRepository.findAll();
  }

  findOne(id: string): Task {
    const task = this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    const user = this.userRepository.findOne(updateTaskDto.AssigneeUserId!);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${updateTaskDto.AssigneeUserId} not found`,
      );
    }
    const updatedTask = this.taskRepository.update(id, updateTaskDto, user);
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return updatedTask;
  }

  remove(id: string): { deleted: boolean } {
    const deleted = this.taskRepository.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return { deleted: true };
  }
}
