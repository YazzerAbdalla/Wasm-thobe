/**
 * @file http-exception.filter.spec.ts
 * @description Unit tests for HttpExceptionFilter.
 */

import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { ArgumentsHost } from '@nestjs/common';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;
  let mockArgumentsHost: Partial<ArgumentsHost>;
  let mockResponse: any;
  let mockRequest: any;

  beforeEach(() => {
    filter = new HttpExceptionFilter();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockRequest = {
      url: '/test-url',
      method: 'GET',
    };
    mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    };
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('should format HttpException correctly', () => {
    const status = HttpStatus.NOT_FOUND;
    const message = 'Test not found';
    const exception = new HttpException(message, status);

    filter.catch(exception, mockArgumentsHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(status);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: status,
        message: message,
        path: mockRequest.url,
        error: 'HttpException',
      }),
    );
  });

  it('should handle non-HttpException as 500 error', () => {
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const exception = new Error('Unknown error');

    filter.catch(exception, mockArgumentsHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(status);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: status,
        message: 'Internal server error',
        error: 'InternalServerError',
      }),
    );
  });

  it('should handle validation errors correctly (array of messages)', () => {
    const status = HttpStatus.BAD_REQUEST;
    const messages = ['email must be an email', 'password is too short'];
    const exception = new HttpException(
      { message: messages, error: 'Bad Request' },
      status,
    );

    filter.catch(exception, mockArgumentsHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(status);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: status,
        message: messages,
      }),
    );
  });
});
