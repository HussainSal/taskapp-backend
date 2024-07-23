import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformerInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // globally setting validation pipe
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformerInterceptor())

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('TaskApp')
    .setDescription('Apis for TaskApp.')
    .setVersion('1.0')
    .addCookieAuth('accessToken', {
      type: 'http',
      scheme: 'Bearer',
      in: 'Header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(3001);
}
bootstrap();
