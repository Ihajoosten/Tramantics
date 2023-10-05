import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum MarketType {
  EXPANSION = 'Expansion',
  REVERSAL = 'Reversal',
  CONSOLIDATION = 'Consolidation',
}

@Table
export class TradingModel extends Model<TradingModel> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  uuid: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Column({ type: DataType.STRING, allowNull: false })
  summary: string;

  @Column({
    type: DataType.ARRAY(DataType.ENUM({ values: Object.values(MarketType) })),
    allowNull: false,
  })
  marketCondition: Array<MarketType>;
}
