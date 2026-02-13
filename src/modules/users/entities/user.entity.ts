import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { TimeStamps } from 'src/common/types/timeStamps';

export class User extends TimeStamps {
  @ApiProperty({
    example: '1',
    description: 'ID of the user',
  })
  @IsString({ message: 'invalid-id-type' })
  @IsOptional()
  id: string;

  @ApiProperty({
    example: 'John',
    description: 'Name of the user',
  })
  @IsString({ message: 'invalid-name-type' })
  name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsString({ message: 'invalid-last-name-type' })
  lastName: string;
}
