import { DocumentBuilder } from '@nestjs/swagger';

export const ApiSwaggerOptions = new DocumentBuilder()
  .setTitle('BilibOl API')
  .setDescription('BilibOL API documantation')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
  )
  .build();
