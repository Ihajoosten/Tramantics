import {
  IsOptional,
  IsString,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { MarketType } from '../trading-model.entity';

export class UpdateTradingModelDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(MarketType, { each: true })
  marketCondition?: Array<MarketType>;
}
