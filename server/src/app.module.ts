// NestJS
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';

// Core Modules
import { AuthModule } from './core/auth/auth.module';
import { DatabaseModule } from './core/database/database.module';

// Domain Modules
import { UserModule } from './modules/user/user.module';

// Filters
import { NotFoundExceptionFilter } from './core/filters/not-found.filter';

// Custom Imports
import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Enable CORS for all routes
    consumer.apply(express.json()).forRoutes('*');
    consumer.apply(express.urlencoded({ extended: true })).forRoutes('*');
    consumer.apply(cors()).forRoutes('*');
  }
}
