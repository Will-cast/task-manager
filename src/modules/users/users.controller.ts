import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    description: 'Create a new user',
    summary: 'Create a new user',
  })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    description: 'Get all users',
    summary: 'Get all users',
  })
  @ApiOkResponse({
    description: 'Returns all users',
    type: User,
    isArray: true,
  })
  @ApiQuery({
    name: 'order',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Sort order, defaults to "desc"',
  })
  @ApiQuery({
    name: 'by',
    required: false,
    enum: ['id', 'name', 'lastName'],
    description: 'Field to sort by',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    default: 10,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    default: 1,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search by name or lastName',
  })
  @Get()
  findAll(
    @Query('order') order: 'asc' | 'desc' = 'desc',
    @Query('by') by: 'id' | 'name' | 'lastName' = 'name',
    @Query('take') take: number = 10,
    @Query('page') page: number = 1,
    @Query('search') search?: string,
  ): User[] {
    return this.usersService.findAll(order, by, take, page, search);
  }

  @ApiOperation({
    description: 'Get user by id',
    summary: 'Get user by id',
  })
  @ApiOkResponse({
    description: 'Returns the user',
    type: User,
  })
  @ApiParam({
    example: '1',
    description: 'User id',
    name: 'id',
    type: 'string',
  })
  @Get(':id')
  findOne(@Param('id') id: string): User {
    return this.usersService.findOne(id);
  }

  @ApiOperation({
    description: 'Update user',
    summary: 'Update user',
  })
  @ApiOkResponse({
    description: 'The user has been successfully updated.',
    type: User,
  })
  @ApiParam({
    example: '1',
    description: 'User id',
    name: 'id',
    type: 'string',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): User {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({
    description: 'Delete user (soft delete)',
    summary: 'Delete user',
  })
  @ApiOkResponse({
    description: 'The user has been successfully deleted.',
    type: User,
  })
  @ApiParam({
    example: '1',
    description: 'User id',
    name: 'id',
    type: 'string',
  })
  @Delete(':id')
  remove(@Param('id') id: string): User {
    return this.usersService.remove(id);
  }
}
