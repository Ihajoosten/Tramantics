import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants/index';
import { databaseConfig } from './database.config';

// Entitites
import { User } from '../../modules/user/user.entity';
import { Trade } from 'src/modules/trade/trade.entity';
import { TradingModel } from 'src/modules/trading-model/trading-model.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config: any;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Trade, TradingModel]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
