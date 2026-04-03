/**
 * @file users.service.spec.ts
 * @module UsersModule
 * @description Unit tests for UsersService.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: any;

  const mockUserRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a user if found', async () => {
      const mockUser = { id: 'uuid', email: 'test@example.com' };
      repository.findOne.mockResolvedValue(mockUser);

      const result = await service.findById('uuid');

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 'uuid' } });
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findById('uuid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('should return a user if found', async () => {
      const mockUser = { id: 'uuid', email: 'test@example.com' };
      repository.findOne.mockResolvedValue(mockUser);

      const result = await service.findByEmail('test@example.com');

      expect(repository.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(result).toEqual(mockUser);
    });

    it('should return null if user not found', async () => {
      repository.findOne.mockResolvedValue(null);

      const result = await service.findByEmail('test@example.com');

      expect(result).toBeNull();
    });

    it('should include password if requested', async () => {
      const mockUser = { id: 'uuid', email: 'test@example.com', password: 'hash' };
      repository.findOne.mockResolvedValue(mockUser);

      await service.findByEmail('test@example.com', true);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        select: ['id', 'email', 'password', 'role', 'phoneNumber', 'createdAt'],
      });
    });
  });
});
