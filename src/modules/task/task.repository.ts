import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskPriority, TaskStatus } from './types';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TaskRepository {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Task Example',
      status: TaskStatus.PENDING,
      priority: TaskPriority.LOW,
      dueDate: new Date(),
      assignee: {
        id: '1',
        name: 'William',
        lastName: 'Quiñones',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      comments: ['Comment 1', 'Comment 2'],
      attachments: ['image1.jpg', 'image2.png'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  create(createTaskDto: CreateTaskDto, user: User): Task {
    const newTask: Task = {
      ...createTaskDto,
      id: (this.tasks.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      assignee: user,
    } as Task;

    this.tasks.push(newTask);
    return newTask;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    assignee?: User,
  ): Task | undefined {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) return undefined;

    this.tasks[index] = {
      ...this.tasks[index],
      ...updateTaskDto,
      updatedAt: new Date(),
      assignee,
    } as Task;

    return this.tasks[index];
  }

  remove(id: string): Task | undefined {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) return undefined;
    this.tasks[index] = {
      ...this.tasks[index],
      isDeleted: true,
      deletedAt: new Date(),
    } as Task;
    return this.tasks[index];
  }
}
