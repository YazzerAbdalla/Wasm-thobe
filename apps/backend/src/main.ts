/**
 * @file main.ts
 * @description Entry point for the NestJS application.
 *              Configures the app instance, middleware, and server port.
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

/**
 * Bootstraps the NestJS application.
 *
 * @returns {Promise<void>} Resolves when the application has started.
 */
async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Task 0.6: Set global prefix
  app.setGlobalPrefix('api');

  // Task 0.6: Enable CORS for frontend
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Task 0.6: Register ValidationPipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown properties
      forbidNonWhitelisted: true,
      transform: true, // auto-transform payloads to DTO instances
    }),
  );

  // Task 0.6: Register global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}/api`);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
