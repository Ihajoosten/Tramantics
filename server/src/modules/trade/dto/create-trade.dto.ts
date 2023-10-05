import {
  IsNotEmpty,
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

export class CreateTradeDTO {
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsEnum(DayOfWeek)
  day: DayOfWeek;

  @IsNotEmpty()
  @IsEnum(PositionType)
  position: PositionType;

  @IsNotEmpty()
  @IsDate()
  entryTime: Date;

  @IsNotEmpty()
  @IsDate()
  exitTime: Date;

  @IsNotEmpty()
  durationInMinutes: number;

  @IsNotEmpty()
  @IsBoolean()
  stopHit: boolean;

  @IsNotEmpty()
  @IsEnum(TradeOutcomeType)
  winOrLoss: TradeOutcomeType;

  @IsNotEmpty()
  riskReward: number;

  @IsNotEmpty()
  PNL: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(EntryArgType, { each: true })
  entryArgs: EntryArgType[];

  @IsNotEmpty()
  @IsEnum(PhaseType)
  phase: PhaseType;

  @IsNotEmpty()
  tradingModelId: string;
}
