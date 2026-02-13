import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TaskStatus } from './types';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({
    description: 'Create a new task',
    summary: 'Create a new task',
  })
  @ApiCreatedResponse({
    description: 'The task has been successfully created.',
    type: Task,
  })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.create(createTaskDto);
  }

  @ApiOperation({
    description: 'Get all tasks',
    summary: 'Get all tasks',
  })
  @ApiOkResponse({
    description: 'Returns all tasks',
    type: Task,
    isArray: true,
  })
  @Get()
  findAll(): Task[] {
    return this.taskService.findAll();
  }

  @ApiOperation({
    description: 'Get task by id',
    summary: 'Get task by id',
  })
  @ApiOkResponse({
    description: 'Returns the task',
    type: Task,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Task {
    return this.taskService.findOne(id);
  }

  @ApiOperation({
    description: 'Update task',
    summary: 'Update task',
  })
  @ApiOkResponse({
    description: 'The task has been successfully updated.',
    type: Task,
  })
  @ApiParam({
    example: '1',
    description: 'Task id',
    name: 'id',
    type: 'string',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
    return this.taskService.update(id, updateTaskDto);
  }
  @ApiOperation({
    description: 'Set completed status of the task',
    summary: 'Set completed status of the task',
  })
  @ApiOkResponse({
    description: 'The task status has been updated.',
    type: Task,
  })
  @ApiParam({
    example: '1',
    description: 'Task id',
    name: 'id',
    type: 'string',
  })
  @ApiParam({
    example: 'pending',
    description: 'Task status',
    name: 'status',
    enum: TaskStatus,
  })
  @Patch(':id/set-task-status/:status')
  setTaskStatus(
    @Param('id') id: string,
    @Param('status') status: TaskStatus,
  ): Task {
    return this.taskService.setTaskStatus(id, status);
  }

  @ApiOperation({
    description: 'Delete task',
    summary: 'Delete task',
  })
  @ApiOkResponse({
    description: 'The task has been successfully deleted.',
    schema: {
      type: 'object',
      properties: {
        deleted: { type: 'boolean' },
      },
    },
  })
  @ApiParam({
    example: '1',
    description: 'Task id',
    name: 'id',
    type: 'string',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Task {
    return this.taskService.remove(id);
  }
}
