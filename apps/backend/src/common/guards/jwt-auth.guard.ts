/**
 * @file jwt-auth.guard.ts
 * @description Global JWT authentication guard.
 *              Protects routes by requiring a valid Bearer token in the header.
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
