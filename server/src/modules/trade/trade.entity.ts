import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { TradingModel } from '../trading-model/trading-model.entity';
import { User } from '../user/user.entity';
import { Journal } from '../journal/journal.entity';

export enum DayOfWeek {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
}

export enum PositionType {
  LONG = 'Long',
  SHORT = 'Short',
}

export enum TradeOutcomeType {
  WIN = 'Win',
  LOSS = 'Loss',
}

export enum EntryArgType {
  ORDERBLOCK = 'Orderblock',
  BREAKER = 'Breaker',
  FVG = 'FVG',
  MITIGATION_BLOCK = 'Mitigation Block',
  TURTLE_SOUP = 'Turtle Soup',
  BPR = 'Balanced Price Range',
  IFVG = 'Inversion FVG',
}

export enum PhaseType {
  ACCUMULATION = 'Accumulation',
  MANIPULATION = 'Manipulation',
  DISTRIBUTION = 'Distribution',
}

@Table
export class Trade extends Model<Trade> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  uuid: string;

  @Column({ type: DataType.STRING, allowNull: false })
  symbol: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  date: Date;

  @Column({
    type: DataType.ENUM({ values: Object.values(DayOfWeek) }),
    allowNull: false,
  })
  day: DayOfWeek;

  @Column({
    type: DataType.ENUM({ values: Object.values(PositionType) }),
    allowNull: false,
  })
  position: PositionType;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  entryTime: Date;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  exitTime: Date;

  @Column({ type: DataType.INTEGER, allowNull: false })
  durationInMinutes: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  stopHit: boolean;

  @Column({
    type: DataType.ENUM({ values: Object.values(TradeOutcomeType) }),
    allowNull: false,
  })
  winOrLoss: TradeOutcomeType;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  riskReward: number;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  PNL: number;

  @Column({
    type: DataType.ARRAY(
      DataType.ENUM({ values: Object.values(EntryArgType) }),
    ),
    allowNull: false,
  })
  entryArgs: Array<EntryArgType>;

  @Column({
    type: DataType.ENUM({ values: Object.values(PhaseType) }),
    allowNull: false,
  })
  phase: PhaseType;

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

  @ForeignKey(() => TradingModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: 'TradingModel',
      key: 'uuid',
    },
  })
  tradingModelId: string;

  @BelongsTo(() => TradingModel)
  tradingModel: TradingModel;

  @ForeignKey(() => Journal)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: 'Journal',
      key: 'uuid',
    },
  })
  journalId: string;

  @BelongsTo(() => Journal)
  journal: Journal;
}
