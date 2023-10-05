import { Test, TestingModule } from '@nestjs/testing';
import { TradingModelService } from '../trading-model.service';

describe('TradingModelService', () => {
  let service: TradingModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradingModelService],
    }).compile();

    service = module.get<TradingModelService>(TradingModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
