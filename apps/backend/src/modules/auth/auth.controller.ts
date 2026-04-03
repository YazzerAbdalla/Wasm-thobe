/**
 * @file auth.controller.ts
 * @module AuthModule
 * @description HTTP controller for authentication endpoints.
 *              Delegates business logic to AuthService.
 */

import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
import { IAuthTokens } from './interfaces/auth-tokens.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registers a new user.
   *
   * @param {RegisterDto} dto - Validated registration payload
   * @returns {Promise<User>} The newly created user
   */
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async register(@Body() dto: RegisterDto): Promise<User> {
    return this.authService.register(dto);
  }

  /**
   * Validates user credentials and issues tokens.
   *
   * @param {LoginDto} dto - Validated login payload
   * @returns {Promise<IAuthTokens>} Access and refresh tokens
   */
  @Post('login')
  @ApiOperation({ summary: 'Login and issue JWT tokens' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() dto: LoginDto): Promise<IAuthTokens> {
    return this.authService.login(dto);
  }

  /**
   * Refreshes access token using a valid refresh token.
   *
   * @param {string} refreshToken - Refresh token from the client
   * @returns {Promise<IAuthTokens>} New access and refresh tokens
   */
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh tokens using refresh token' })
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refresh(@Body('refreshToken') refreshToken: string): Promise<IAuthTokens> {
    return this.authService.refresh(refreshToken);
  }
}
