import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';

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

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: 'User',
      key: 'uuid',
    },
  })
  authorId: string;

  @BelongsTo(() => User)
  author: User;
}
