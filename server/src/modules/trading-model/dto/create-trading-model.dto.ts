import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { MarketType } from '../trading-model.entity';

export class CreateTradingModelDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(MarketType, { each: true })
  marketCondition: Array<MarketType>;

  @IsNotEmpty()
  @IsString()
  authorId: string;
}
