import { TRADING_MODEL_REPOSITORY } from '../../core/constants';
import { TradingModel } from './trading-model.entity';

export const tradingModelsProviders = [
  {
    provide: TRADING_MODEL_REPOSITORY,
    useValue: TradingModel,
  },
];
