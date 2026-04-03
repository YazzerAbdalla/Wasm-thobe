/**
 * @file users.controller.ts
 * @module UsersModule
 * @description HTTP controller for user profile endpoints.
 *              Delegates all business logic to UsersService.
 */

import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Retrieves the authenticated user's profile.
   *
   * @param {any} user - Injected JWT payload from @CurrentUser()
   * @returns {Promise<User>} The full user profile
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@CurrentUser() user: any): Promise<User> {
    return this.usersService.findById(user.userId);
  }
}
