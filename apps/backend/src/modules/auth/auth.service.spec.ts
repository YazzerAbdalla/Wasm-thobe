/**
 * @file auth.service.spec.ts
 * @module AuthModule
 * @description Unit tests for AuthService.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../users/enums/user-role.enum';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: any;
  let refreshTokenRepository: any;
  let jwtService: any;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockRefreshTokenRepository = {
    save: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    signAsync: jest.fn(),
    verify: jest.fn(),
    verifyAsync: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'JWT_EXPIRES_IN') return '15m';
      if (key === 'JWT_REFRESH_EXPIRES_IN') return '7d';
      return 'secret';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(RefreshToken),
          useValue: mockRefreshTokenRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));
    refreshTokenRepository = module.get(getRepositoryToken(RefreshToken));
    jwtService = module.get(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    const registerDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should hash the password before saving', async () => {
      const hashedPassword = 'hashed_password';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      userRepository.findOne.mockResolvedValue(null);
      userRepository.create.mockReturnValue({ ...registerDto, password: hashedPassword });
      userRepository.save.mockResolvedValue({ id: 'uuid', ...registerDto, password: hashedPassword });

      const result = await service.register(registerDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(registerDto.password, 12);
      expect(userRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ password: hashedPassword }),
      );
      expect(result).toBeDefined();
    });

    it('should throw ConflictException if email already exists', async () => {
      userRepository.findOne.mockResolvedValue({ id: 'uuid', email: registerDto.email });

      await expect(service.register(registerDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    const loginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockUser = {
      id: 'user-uuid',
      email: 'test@example.com',
      password: 'hashed_password',
      role: UserRole.USER,
    };

    it('should return accessToken and refreshToken on valid credentials', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtService.signAsync.mockResolvedValueOnce('access_token').mockResolvedValueOnce('refresh_token');
      (bcrypt.hash as jest.Mock).mockResolvedValue('token_hash');

      const result = await service.login(loginDto);

      expect(userRepository.findOne).toHaveBeenCalledWith(
        expect.objectContaining({ where: { email: loginDto.email } }),
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, mockUser.password);
      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(refreshTokenRepository.save).toHaveBeenCalled();
      expect(result).toEqual({
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
      });
    });

    it('should throw UnauthorizedException if email not found', async () => {
      userRepository.findOne.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('refresh', () => {
    const refreshToken = 'valid_refresh_token';
    const payload = { sub: 'user-uuid', email: 'test@example.com', role: UserRole.USER };

    it('should return new token pair on valid refresh token', async () => {
      jwtService.verifyAsync.mockResolvedValue(payload);
      refreshTokenRepository.find.mockResolvedValue([{
        id: 'token-uuid',
        tokenHash: 'hashed_token',
        userId: 'user-uuid',
      }]);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtService.signAsync.mockResolvedValueOnce('new_access_token').mockResolvedValueOnce('new_refresh_token');

      const result = await service.refresh(refreshToken);

      expect(jwtService.verifyAsync).toHaveBeenCalledWith(refreshToken, expect.any(Object));
      expect(refreshTokenRepository.delete).toHaveBeenCalledWith({ id: 'token-uuid' });
      expect(result).toEqual({
        accessToken: 'new_access_token',
        refreshToken: 'new_refresh_token',
      });
    });

    it('should throw UnauthorizedException if token hash not found in DB', async () => {
      jwtService.verifyAsync.mockResolvedValue(payload);
      refreshTokenRepository.find.mockResolvedValue([]);

      await expect(service.refresh(refreshToken)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if token is invalid or expired', async () => {
      jwtService.verifyAsync.mockRejectedValue(new Error('Expired'));

      await expect(service.refresh(refreshToken)).rejects.toThrow(UnauthorizedException);
    });
  });
});
