/**
 * @file current-user.decorator.ts
 * @description Parameter decorator to extract the user object from the request.
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Extracts the user object populated by Passport from the request.
 *
 * @param {string | undefined} data - Optional property name to extract from the user object
 * @param {ExecutionContext} ctx - Context for the current request
 * @returns {any} The user object or a specific property of it
 */
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
