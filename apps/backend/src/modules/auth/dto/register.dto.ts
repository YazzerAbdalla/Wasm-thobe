/**
 * @file register.dto.ts
 * @module AuthModule
 * @description Validated payload for user registration.
 */

import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'User password (min 8 characters)' })
  @IsString()
  @MinLength(8)
  readonly password: string;

  @ApiProperty({ description: 'User phone number (optional)', required: false })
  @IsString()
  @IsOptional()
  readonly phoneNumber?: string;
}
