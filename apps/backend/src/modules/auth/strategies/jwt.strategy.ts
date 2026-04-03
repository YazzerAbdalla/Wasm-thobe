/**
 * @file jwt.strategy.ts
 * @module AuthModule
 * @description Passport strategy for validating JWT access tokens.
 *              Extracts the payload and attaches it to the request object.
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * Validates the decoded JWT payload.
   *
   * @param {any} payload - Decoded JWT payload containing user ID, email, and role
   * @returns {Promise<any>} The validated payload to be attached to the request
   */
  async validate(payload: any): Promise<any> {
    // sub is the userId
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
