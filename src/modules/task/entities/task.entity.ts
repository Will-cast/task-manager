import { ApiProperty } from '@nestjs/swagger';
import { TimeStamps } from 'src/common/types/timeStamps';
import { IsEnum } from 'class-validator';
import { TaskPriority, TaskStatus } from '../types';
import { User } from 'src/modules/users/entities/user.entity';

export class Task extends TimeStamps {
  @ApiProperty({
    example: '1',
    description: 'ID of the task',
  })
  id: string;

  @ApiProperty({
    example: 'Task 1',
    description: 'Title of the task',
  })
  title: string;

  @ApiProperty({
    example: 'Description of the task',
    description: 'Description of the task',
  })
  description: string;

  @ApiProperty({
    example: 'Pending',
    description: 'Status of the task',
  })
  @IsEnum(TaskStatus, { message: 'invalid-status' })
  status: TaskStatus;

  @ApiProperty({
    example: 'High',
    description: 'Priority of the task',
  })
  @IsEnum(TaskPriority, { message: 'invalid-priority' })
  priority: TaskPriority;

  @ApiProperty({
    example: '2026-01-01T00:00:00.000Z',
    description: 'Due date of the task',
  })
  dueDate: Date;

  @ApiProperty({
    example: '1',
    description: 'Assignee of the task',
  })
  assignee: User;

  @ApiProperty({
    example: ['Comment 1', 'Comment 2'],
    description: 'Comments of the task',
  })
  comments: string[];

  @ApiProperty({
    example: ['image1.jpg', 'image2.png'],
    description: 'Attachments of the task',
  })
  attachments: string[];
}
