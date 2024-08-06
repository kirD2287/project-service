import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQModule } from './rabbitmq.module';
import { ProjectModule } from './project/project.module';
import { ProjectService } from './project/project.service';
import { TaskService } from './project/progress/task/task.service';
import { ProgressService } from './project/progress/progress.service';
import { PrismaService } from './prisma.serviсe';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';

@Module({
  imports: [RabbitMQModule, ProjectModule],
  controllers: [AppController],
  providers: [RabbitMQService, ProjectService, TaskService, ProgressService, PrismaService, JwtService],
})
export class AppModule {}
