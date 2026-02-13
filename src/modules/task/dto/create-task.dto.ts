import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDate,
  IsArray,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TaskPriority, TaskStatus } from '../types';
import { TimeStamps } from 'src/common/types/timeStamps';

export class CreateTaskDto extends TimeStamps {
  @ApiProperty({
    example: 'Task 1',
    description: 'Title of the task',
  })
  @IsString({ message: 'invalid-title-type' })
  @IsNotEmpty({ message: 'title-is-required' })
  title: string;

  @ApiProperty({
    example: 'Description of the task',
    description: 'Description of the task',
  })
  @IsString({ message: 'invalid-description-type' })
  @IsNotEmpty({ message: 'description-is-required' })
  description: string;

  @ApiProperty({
    example: 'pending',
    description: 'Status of the task',
  })
  @IsEnum(TaskStatus, { message: 'invalid-status' })
  @IsNotEmpty({ message: 'status-is-required' })
  status: TaskStatus;

  @ApiProperty({
    example: 'high',
    description: 'Priority of the task',
  })
  @IsEnum(TaskPriority, { message: 'invalid-priority' })
  @IsNotEmpty({ message: 'priority-is-required' })
  priority: TaskPriority;

  @ApiProperty({
    example: '2026-01-01T00:00:00.000Z',
    description: 'Due date of the task',
  })
  @Type(() => Date)
  @IsDate({ message: 'invalid-due-date-type' })
  @IsNotEmpty({ message: 'due-date-is-required' })
  dueDate: Date;

  @ApiProperty({
    example: '1',
    description: 'Assignee user id of the task',
  })
  @IsString({ message: 'invalid-userId-type' })
  @IsNotEmpty({ message: 'user-id-is-required' })
  AssigneeUserId: string;

  @ApiProperty({
    example: ['Comment 1', 'Comment 2'],
    description: 'Comments of the task',
  })
  @IsArray({ message: 'invalid-comments-type' })
  @IsOptional()
  comments?: string[];

  @ApiProperty({
    example: ['image1.jpg', 'image2.png'],
    description: 'Attachments of the task',
  })
  @IsArray({ message: 'invalid-attachments-type' })
  @IsOptional()
  attachments?: string[];

  @ApiProperty({
    example: false,
    description: 'Is deleted',
  })
  @IsBoolean({ message: 'invalid-is-deleted-type' })
  @IsOptional()
  isDeleted?: boolean;
}
