/**
 * @file auth.service.ts
 * @module AuthModule
 * @description Handles user registration, login, JWT token issuance,
 *              and refresh token rotation. Delegates password hashing to bcrypt.
 */

import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { IAuthTokens } from './interfaces/auth-tokens.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Registers a new user in the system.
   *
   * @param {RegisterDto} dto - Validated registration payload
   * @returns {Promise<User>} The newly created user (password excluded)
   * @throws {ConflictException} If the email is already registered
   */
  async register(dto: RegisterDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException(`User with email ${dto.email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    // Remove password before returning
    const { password, ...result } = savedUser;
    return result as User;
  }

  /**
   * Validates user credentials and issues a JWT access token and refresh token.
   *
   * @param {LoginDto} dto - Validated login payload containing email and password
   * @returns {Promise<IAuthTokens>} Object containing accessToken and refreshToken strings
   * @throws {UnauthorizedException} If the email is not found or password does not match
   */
  async login(dto: LoginDto): Promise<IAuthTokens> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: ['id', 'email', 'password', 'role'], // Explicitly select password
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  /**
   * Verifies a refresh token and issues a new pair of tokens (rotation).
   *
   * @param {string} refreshToken - Raw refresh token from the client
   * @returns {Promise<IAuthTokens>} New access and refresh tokens
   * @throws {UnauthorizedException} If token is invalid, expired, or not in DB
   */
  async refresh(refreshToken: string): Promise<IAuthTokens> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const userId = payload.sub;
      const storedTokens = await this.refreshTokenRepository.find({
        where: { userId },
      });

      // Find the specific token hash that matches the provided token
      let matchedToken: RefreshToken | null = null;
      for (const token of storedTokens) {
        const isValid = await bcrypt.compare(refreshToken, token.tokenHash);
        if (isValid) {
          matchedToken = token;
          break;
        }
      }

      if (!matchedToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Rotation: delete the old token
      await this.refreshTokenRepository.delete({ id: matchedToken.id });

      // Generate new pair
      const tokens = await this.generateTokens(
        userId,
        payload.email,
        payload.role,
      );
      await this.saveRefreshToken(userId, tokens.refreshToken);

      return tokens;
    } catch (error) {
      this.logger.warn(`Refresh token failed: ${error.message}`);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /**
   * Generates a pair of JWT access and refresh tokens.
   *
   * @param {string} userId - UUID of the user
   * @param {string} email - User's email address
   * @param {string} role - User's assigned role
   * @returns {Promise<IAuthTokens>} Generated token pair
   */
  private async generateTokens(
    userId: string,
    email: string,
    role: string,
  ): Promise<IAuthTokens> {
    const payload = { sub: userId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  /**
   * Hashes and saves a refresh token for a given user.
   *
   * @param {string} userId - UUID of the user
   * @param {string} refreshToken - Raw JWT refresh token
   */
  private async saveRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const tokenHash = await bcrypt.hash(refreshToken, 10);
    const expiresAt = new Date();
    // 7d -> convert to date. Rough approximation:
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.refreshTokenRepository.save({
      userId,
      tokenHash,
      expiresAt,
    });
  }
}
