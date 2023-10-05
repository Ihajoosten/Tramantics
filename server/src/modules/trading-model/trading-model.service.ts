import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TradingModel } from './trading-model.entity';
import { TRADING_MODEL_REPOSITORY } from 'src/core/constants';
import { CreateTradingModelDTO } from './dto/create-trading-model.dto';
import { UpdateTradingModelDTO } from './dto/update-trading-model.dto';

@Injectable()
export class TradingModelService {
  constructor(
    @Inject(TRADING_MODEL_REPOSITORY)
    private readonly tradingModelRepo: typeof TradingModel,
  ) {}

  async create(
    createTradingModelDTO: CreateTradingModelDTO,
  ): Promise<TradingModel> {
    return this.tradingModelRepo.create(createTradingModelDTO);
  }

  async findAll(): Promise<Array<TradingModel>> {
    return this.tradingModelRepo.findAll();
  }

  async findOne(uuid: string): Promise<TradingModel> {
    const tradingModel = await this.tradingModelRepo.findByPk(uuid);
    if (!tradingModel) {
      throw new NotFoundException('TradingModel not found');
    }
    return tradingModel;
  }

  async update(
    uuid: string,
    updateTradingModel: UpdateTradingModelDTO,
  ): Promise<TradingModel> {
    const tradingModel = await this.findOne(uuid);
    if (!tradingModel) throw new NotFoundException('TradingModel not found');

    await this.tradingModelRepo.update(updateTradingModel, { where: { uuid } });
    // Fetch the trading model again to get the updated instance
    const updatedTradingModel = await this.findOne(uuid);
    return updatedTradingModel;
  }

  async remove(uuid: string): Promise<void> {
    const tradingModel = await this.findOne(uuid);
    if (!tradingModel) throw new NotFoundException('TradingModel not found');
    await this.tradingModelRepo.destroy({ where: { uuid } });
  }
}
