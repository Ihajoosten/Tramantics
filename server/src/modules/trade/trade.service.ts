import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Trade } from './trade.entity';
import { TRADE_REPOSITORY } from 'src/core/constants';
import { CreateTradeDTO } from './dto/create-trade.dto';
import { UpdateTradeDTO } from './dto/update-trade.dto';

@Injectable()
export class TradeService {
  constructor(
    @Inject(TRADE_REPOSITORY)
    private readonly tradeRepo: typeof Trade,
  ) {}

  async create(createTradeDTO: CreateTradeDTO): Promise<Trade> {
    return this.tradeRepo.create(createTradeDTO);
  }

  async findAll(): Promise<Array<Trade>> {
    return this.tradeRepo.findAll();
  }

  async findOne(uuid: string): Promise<Trade> {
    const trade = await this.tradeRepo.findByPk(uuid);
    if (!trade) {
      throw new NotFoundException('Trade not found');
    }
    return trade;
  }

  async update(uuid: string, updateTrade: UpdateTradeDTO): Promise<Trade> {
    const trade = await this.findOne(uuid);
    if (!trade) throw new NotFoundException('Trade not found');

    await this.tradeRepo.update(updateTrade, { where: { uuid } });
    // Fetch the Trade again to get the updated instance
    const updatedTrade = await this.findOne(uuid);
    return updatedTrade;
  }

  async remove(uuid: string): Promise<void> {
    const trade = await this.findOne(uuid);
    if (!trade) throw new NotFoundException('Trade not found');
    await this.tradeRepo.destroy({ where: { uuid } });
  }
}
