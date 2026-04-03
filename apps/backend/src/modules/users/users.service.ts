/**
 * @file users.service.ts
 * @module UsersModule
 * @description Service for managing user data.
 *              Provides methods for finding users by various criteria.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsSelect } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Retrieves a single user by their UUID.
   *
   * @param {string} id - UUID of the user to find
   * @returns {Promise<User>} The found user object
   * @throws {NotFoundException} If the user is not found
   */
  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  /**
   * Retrieves a user by their email address.
   *
   * @param {string} email - Email of the user to find
   * @param {boolean} [includePassword=false] - Whether to explicitly select the password field
   * @returns {Promise<User | null>} The found user or null
   */
  async findByEmail(
    email: string,
    includePassword = false,
  ): Promise<User | null> {
    const select: FindOptionsSelect<User> | undefined = includePassword
      ? ['id', 'email', 'password', 'role', 'phoneNumber', 'createdAt']
      : undefined;

    return this.userRepository.findOne({
      where: { email },
      select,
    });
  }
}
