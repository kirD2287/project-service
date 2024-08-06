import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {

  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private initialized: boolean;

  async onModuleInit() {
    await this.initializeConnection();
  }

  async onModuleDestroy() {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
      console.log('RabbitMQ connection and channel closed successfully');
    } catch (error) {
      console.error('Failed to close RabbitMQ connection and channel', error);
    }
  }

  private async initializeConnection() {
    try {
      this.connection = await amqp.connect('amqp://guest:guest@localhost:5672');
      this.channel = await this.connection.createChannel();
      await this.channel.assertExchange('exchange_name', 'topic', { durable: true });
      this.initialized = true;
      console.log('RabbitMQ connection and channel established successfully');
    } catch (error) {
      console.error('Failed to establish RabbitMQ connection and channel', error);
      this.initialized = false;
      throw error;
    }
  }

  private async ensureInitialized() {
    if (!this.initialized) {
      await this.initializeConnection();
    }
  }

  async publish(routingKey: string, message: any) {
    await this.ensureInitialized();
    this.channel.publish('exchange_name', routingKey, Buffer.from(JSON.stringify(message)));
  }

  async consume(queue: string, routingKey: string, handler: (msg: amqp.ConsumeMessage) => void) {
    await this.ensureInitialized();

    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.bindQueue(queue, 'exchange_name', routingKey);
    this.channel.consume(queue, async (msg) => {
      try {
        await handler(msg);
        this.channel.ack(msg);
      } catch (error) {
        console.error('Error processing message:', error.message);
        this.channel.nack(msg, false, false);
      }
    }, { noAck: false });
  }

  acknowledgeMessage(msg: amqp.ConsumeMessage) {
    if (!this.channel) {
      throw new Error('RabbitMQ channel is not initialized');
    }
    this.channel.ack(msg);
  }
}