import { Module } from '@nestjs/common';
import { TradeController } from './trade.controller';
import { tradesProviders } from './trade.provider';
import { TradeService } from './trade.service';

@Module({
  controllers: [TradeController],
  providers: [TradeService, ...tradesProviders],
  exports: [TradeService],
})
export class TradeModule {}
