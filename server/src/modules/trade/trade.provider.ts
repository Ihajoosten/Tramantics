import { Trade } from './trade.entity';
import { TRADE_REPOSITORY } from '../../core/constants';

export const tradesProviders = [
  {
    provide: TRADE_REPOSITORY,
    useValue: Trade,
  },
];
