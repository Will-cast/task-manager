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
  ApiTags,
} from '@nestjs/swagger';

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
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
    return this.taskService.update(id, updateTaskDto);
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
  @Delete(':id')
  remove(@Param('id') id: string): { deleted: boolean } {
    return this.taskService.remove(id);
  }
}
