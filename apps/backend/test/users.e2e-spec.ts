/**
 * @file users.e2e-spec.ts
 * @description End-to-end tests for the Users module.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../src/modules/users/enums/user-role.enum';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  const mockUser = {
    id: 'user-uuid',
    email: 'test@example.com',
    role: UserRole.USER,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue({
        findOne: jest.fn().mockResolvedValue(mockUser),
      })
      // Mock TypeOrmModule forRoot to avoid DB connection attempts
      .overrideProvider(TypeOrmModule)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    jwtService = moduleFixture.get<JwtService>(JwtService);
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  describe('GET /users/me', () => {
    it('should return 200 with user profile for authenticated user', async () => {
      const accessToken = jwtService.sign({
        sub: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
      });

      const response = await request(app.getHttpServer())
        .get('/users/me')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        id: mockUser.id,
        email: mockUser.email,
      }));
    });

    it('should return 401 without token', async () => {
      const response = await request(app.getHttpServer()).get('/users/me');
      expect(response.status).toBe(401);
    });
  });
});
