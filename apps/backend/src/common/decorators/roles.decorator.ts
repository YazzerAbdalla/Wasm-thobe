/**
 * @file roles.decorator.ts
 * @description Decorator used to attach required roles to a specific route handler.
 */

import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { UserRole } from '../../modules/users/enums/user-role.enum';

export const ROLES_KEY = 'roles';

/**
 * Attaches roles to the request metadata for access control.
 *
 * @param {...UserRole[]} roles - List of roles permitted to access the route
 * @returns {CustomDecorator} The decorator function
 */
export const Roles = (...roles: UserRole[]): CustomDecorator =>
  SetMetadata(ROLES_KEY, roles);
