import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { Trade } from '../trade/trade.entity';
import { User } from '../user/user.entity';

@Table
export class Journal extends Model<Journal> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  uuid: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  summary: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'uuid',
    },
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Trade)
  trades: Array<Trade>;
}
