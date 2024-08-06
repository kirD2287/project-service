
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import {  ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'





async function start() {
  const PORT = process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('API на Nest.js')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Kirill Dyachkov')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  
  app.useGlobalPipes(new ValidationPipe());

  
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@rabbitmq:5672'],
      queue: 'project_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();

 

  
  
  // await app.listen(PORT, () =>
  //   console.log(`Server started on port = ${PORT}`)
  // );
}
start();
