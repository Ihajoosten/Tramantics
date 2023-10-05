import { Module } from '@nestjs/common';
import { TradingModelController } from './trading-model.controller';
import { TradingModelService } from './trading-model.service';
import { tradingModelsProviders } from './trading-model.provider';

@Module({
  controllers: [TradingModelController],
  providers: [TradingModelService, ...tradingModelsProviders],
  exports: [TradingModelService],
})
export class TradingModelModule {}
