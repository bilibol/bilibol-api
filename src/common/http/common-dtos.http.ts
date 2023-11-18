import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export function IsId(required: boolean = true) {
  return required
    ? applyDecorators(
        ApiProperty({ example: 1 }),
        IsNotEmpty(),
        IsInt(),
        Min(1),
        Type(() => Number),
      )
    : applyDecorators(
        ApiPropertyOptional({ example: 1 }),
        IsOptional(),
        IsInt(),
        Min(1),
        Type(() => Number),
      );
}

export class PaginationDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number;
}
