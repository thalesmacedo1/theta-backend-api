import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  
  app.enableCors();

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Gerenciamento de Pedidos')
    .setDescription('API para gerenciamento de produtos e pedidos')
    .setVersion('1.0')
    .addTag('produtos', 'Ações relacionadas a produtos')
    .addTag('pedidos', 'Ações relacionadas a pedidos')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  await app.listen(process.env.PORT || 3000);
  console.log(`Aplicação inicializada na porta ${process.env.PORT || 3000}`);
  console.log(`Documentação: http://localhost:${process.env.PORT || 3000}/docs`);
}
bootstrap();
