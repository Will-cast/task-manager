import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class TimeStamps {
  @ApiProperty({
    example: '2026-01-01T00:00:00.000Z',
    description: 'Fecha de creación',
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({
    example: '2026-01-01T00:00:00.000Z',
    description: 'Fecha de actualización',
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @ApiProperty({
    example: '2026-01-01T00:00:00.000Z',
    description: 'Fecha de eliminación',
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  deletedAt?: Date;
}
