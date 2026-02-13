import { ApiProperty } from '@nestjs/swagger';
import { TimeStamps } from 'src/common/types/timeStamps';

export class User extends TimeStamps {
  @ApiProperty({
    example: '1',
    description: 'ID of the user',
  })
  id: string;

  @ApiProperty({
    example: 'John',
    description: 'Name of the user',
  })
  name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  lastName: string;

  @ApiProperty({
    example: false,
    description: 'Is deleted',
  })
  isDeleted?: boolean;
}
