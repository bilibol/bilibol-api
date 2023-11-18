import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './common/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { BadRequestExceptionFilter, HttpExceptionFilter } from './common/http/filter-exception.http';
import { ApiSwaggerOptions } from './common/swagger/config.swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
      bodyParser: true,
    });
    const PORT = env.PORT;
    const logger = new Logger();

    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalFilters(new BadRequestExceptionFilter());
    app.enableShutdownHooks();
    app.use(helmet());
    app.use((_: Request, res: Response, next: NextFunction) => {
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      next();
    });
    const ApiDocs = SwaggerModule.createDocument(app, ApiSwaggerOptions);
    SwaggerModule.setup('docs', app, ApiDocs);

    await app.listen(PORT, () => logger.log(`🚀 Listening on port ${PORT} 🚀`));
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
