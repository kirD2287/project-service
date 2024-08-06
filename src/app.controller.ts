
import { Controller, Injectable, OnModuleInit } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  onModuleInit() {
    console.log('ProjectService initialized');
  }

  @EventPattern('user.loggedin')
  async handleUserLoggedIn(@Payload() data: any) {
    console.log('User logged in:', data);

  }

  @EventPattern('user.registered')
  async handleUserRegistered(@Payload() data: any) {
    console.log('User registered:', data);
    
  }
}