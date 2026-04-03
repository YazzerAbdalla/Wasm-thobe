/**
 * @file login.dto.ts
 * @module AuthModule
 * @description Validated payload for user login.
 */

import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  readonly password: string;
}
