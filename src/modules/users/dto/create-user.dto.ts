import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'Name of the user',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
