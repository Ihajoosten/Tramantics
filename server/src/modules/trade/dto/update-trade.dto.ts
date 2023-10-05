import {
  IsOptional,
  IsString,
  IsDate,
  IsEnum,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import {
  DayOfWeek,
  PositionType,
  TradeOutcomeType,
  EntryArgType,
  PhaseType,
} from '../trade.entity';

export class UpdateTradeDTO {
  @IsOptional()
  @IsString()
  symbol?: string;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsEnum(DayOfWeek)
  day?: DayOfWeek;

  @IsOptional()
  @IsEnum(PositionType)
  position?: PositionType;

  @IsOptional()
  @IsDate()
  entryTime?: Date;

  @IsOptional()
  @IsDate()
  exitTime?: Date;

  @IsOptional()
  durationInMinutes?: number;

  @IsOptional()
  @IsBoolean()
  stopHit?: boolean;

  @IsOptional()
  @IsEnum(TradeOutcomeType)
  winOrLoss?: TradeOutcomeType;

  @IsOptional()
  riskReward?: number;

  @IsOptional()
  PNL?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(EntryArgType, { each: true })
  entryArgs?: EntryArgType[];

  @IsOptional()
  @IsEnum(PhaseType)
  phase?: PhaseType;

  @IsOptional()
  tradingModelId?: string;
}
