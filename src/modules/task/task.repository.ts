import { Injectable } from '@nestjs/common';
import { Task, TaskFieldsEnum } from './entities/task.entity';
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

  findAll(
    order: 'asc' | 'desc' = 'desc',
    by: TaskFieldsEnum = 'status',
    take: number = 10,
    page: number = 1,
    available: boolean = false,
    estado?: TaskStatus,
  ): Task[] {
    let result = this.tasks.filter((task) => !task.isDeleted);

    if (estado) {
      result = result.filter((task) => task.status === estado);
    }

    if (available) {
      result = result.filter((task) => task.status !== TaskStatus.COMPLETED);
    }

    result.sort((a, b) => {
      const multiplier = order === 'asc' ? 1 : -1;

      if (by === 'createdAt' || by === 'updatedAt' || by === 'dueDate') {
        const timeA = a[by]?.getTime() ?? 0;
        const timeB = b[by]?.getTime() ?? 0;
        return (timeA - timeB) * multiplier;
      }

      if (
        by === 'id' ||
        by === 'title' ||
        by === 'description' ||
        by === 'status' ||
        by === 'priority'
      ) {
        const strA = a[by] ?? '';
        const strB = b[by] ?? '';
        return strA.localeCompare(strB) * multiplier;
      }

      return 0;
    });

    const skip = (page - 1) * take;
    return result.slice(skip, skip + take);
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
