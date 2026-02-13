import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { UserRepository } from '../users/user.repository';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, UserRepository],
})
export class TaskModule {}
