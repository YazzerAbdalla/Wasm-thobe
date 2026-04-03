/**
 * @file auth-tokens.interface.ts
 * @module AuthModule
 * @description Interface defining the shape of authentication tokens returned to the client.
 */

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}
