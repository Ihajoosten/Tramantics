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
import { TradeModule } from './modules/trade/trade.module';
import { TradingModelModule } from './modules/trading-model/trading-model.module';
import { JournalModule } from './modules/journal/journal.module';

// Filters
import { ErrorFilter } from './core/filters/error.filter';

// Middlewares
import { LoggingMiddleware } from './core/middleware/logger.middleware';

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
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
    UserModule,
    TradeModule,
    TradingModelModule,
    JournalModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Enable CORS for all routes
    consumer.apply(express.json()).forRoutes('*');
    consumer.apply(express.urlencoded({ extended: true })).forRoutes('*');
    consumer.apply(cors()).forRoutes('*');

    // Logging Middleware
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
