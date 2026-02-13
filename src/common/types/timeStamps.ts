import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class TimeStamps {
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  deletedAt?: Date;
}
