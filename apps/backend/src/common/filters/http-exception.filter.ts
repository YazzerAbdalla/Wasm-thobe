/**
 * @file http-exception.filter.ts
 * @description Global exception filter to standardize HTTP error responses.
 *              Ensures a consistent JSON shape for all API errors.
 */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  /**
   * Catches and formats HTTP exceptions.
   *
   * @param {any} exception - The caught exception object
   * @param {ArgumentsHost} host - Context for the current request/response
   */
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal server error' };

    const message =
      typeof exceptionResponse === 'object'
        ? exceptionResponse.message || exceptionResponse.error
        : exceptionResponse;

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
      error:
        exception instanceof HttpException ? exception.name : 'InternalServerError',
    };

    if (status >= 500) {
      this.logger.error(
        `${request.method} ${request.url} ${status} - Error: ${JSON.stringify(
          exception,
        )}`,
      );
    } else {
      this.logger.warn(`${request.method} ${request.url} ${status} - ${message}`);
    }

    response.status(status).json(errorResponse);
  }
}
