import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto): User {
    return this.userRepository.create(createUserDto);
  }

  findAll(
    order: 'asc' | 'desc' = 'desc',
    by: 'id' | 'name' | 'lastName' = 'name',
    take: number = 10,
    page: number = 1,
    search?: string,
  ): User[] {
    return this.userRepository.findAll(order, by, take, page, search);
  }

  findOne(id: string): User {
    const user = this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const updatedUser = this.userRepository.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  remove(id: string): User {
    const user = this.userRepository.remove(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
