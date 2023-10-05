import { Test, TestingModule } from '@nestjs/testing';
import { TradingModelController } from '../trading-model.controller';

describe('TradingModelController', () => {
  let controller: TradingModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TradingModelController],
    }).compile();

    controller = module.get<TradingModelController>(TradingModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
