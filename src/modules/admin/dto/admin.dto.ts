import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  login: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}

export class UpdateAdminDto {
  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(5)
  login: string;

  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(5)
  password: string;
}

export class LoginDto {
  @ApiProperty()
  @MinLength(5)
  @IsNotEmpty()
  login: string;

  @ApiProperty()
  @MinLength(4)
  @IsNotEmpty()
  password: string;
}
