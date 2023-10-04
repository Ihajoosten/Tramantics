import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

export enum UserRole {
  ADMIN = 'Admin',
  MODERATOR = 'Moderator',
  GUEST = 'Guest',
  CUSTOMER = 'Customer',
}

@Table
@Scopes(() => ({
  full: {
    include: [],
  },
}))
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  uuid: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  fullName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  address: string;

  @Column({ type: DataType.STRING, allowNull: false })
  zipCode: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  birthday: Date;

  @Column({
    type: DataType.ENUM('Admin', 'Moderator', 'Guest', 'Customer'),
    defaultValue: UserRole.ADMIN,
    allowNull: true,
  })
  role: UserRole;

  @Column({ type: DataType.DATEONLY, allowNull: true })
  lastLoginDate: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: true, allowNull: true })
  isActive: boolean;

  @CreatedAt
  @Column({ type: DataType.DATEONLY, allowNull: false })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATEONLY, allowNull: false })
  updatedAt: Date;
}
