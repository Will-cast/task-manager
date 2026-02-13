import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

type UserSortableField = 'id' | 'name' | 'lastName';

@Injectable()
export class UserRepository {
  private users: User[] = [
    {
      id: '1',
      name: 'William',
      lastName: 'Quiñones',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      ...createUserDto,
      id: (this.users.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  findAll(
    order: 'asc' | 'desc' = 'desc',
    by: UserSortableField = 'name',
    take: number = 10,
    page: number = 1,
    search?: string,
  ): User[] {
    let result = this.users.filter((user) => !user.isDeleted);

    if (search) {
      const term = search.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.lastName.toLowerCase().includes(term),
      );
    }

    const multiplier = order === 'asc' ? 1 : -1;
    result.sort((a, b) => {
      const strA = a[by] ?? '';
      const strB = b[by] ?? '';
      return strA.localeCompare(strB) * multiplier;
    });

    const skip = (page - 1) * take;
    return result.slice(skip, skip + take);
  }

  findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id && !user.isDeleted);
  }

  update(id: string, updateUserDto: UpdateUserDto): User | undefined {
    const index = this.users.findIndex(
      (user) => user.id === id && !user.isDeleted,
    );
    if (index === -1) return undefined;

    this.users[index] = {
      ...this.users[index],
      ...updateUserDto,
      updatedAt: new Date(),
    };

    return this.users[index];
  }

  remove(id: string): User | undefined {
    const index = this.users.findIndex(
      (user) => user.id === id && !user.isDeleted,
    );
    if (index === -1) return undefined;

    this.users[index] = {
      ...this.users[index],
      isDeleted: true,
      deletedAt: new Date(),
    };

    return this.users[index];
  }
}
