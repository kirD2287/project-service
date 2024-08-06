import { Module } from '@nestjs/common'
import { ProjectController } from './project.controller'
import { ProjectService } from './project.service'
import { JwtModule } from '@nestjs/jwt'
import { ProgressController } from './progress/progress.controller'
import { TaskController } from './progress/task/task.controller'
import { ProgressService } from './progress/progress.service'
import { TaskService } from './progress/task/task.service'
import { PrismaService } from 'src/prisma.serviсe'
import { RabbitMQService } from 'src/rabbitmq.service'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
    controllers: [ProjectController, ProgressController, TaskController],
    providers: [ProjectService, ProgressService, TaskService, PrismaService, RabbitMQService],
    imports: [
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: '24h',
            },
        }),
        // ClientsModule.register([
        //     {
        //       name: 'PROJECT_QUEUE',
        //       transport: Transport.RMQ,
        //       options: {
        //         urls: ['amqp://guest:guest@localhost:5672'],
        //         queue: 'project_queue',
        //         queueOptions: {
        //           durable: true,
        //         },
        //       },
        //     },
        //   ]),
        ],
})
export class ProjectModule {}
