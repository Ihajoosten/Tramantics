import { IsOptional, IsString } from 'class-validator';

export class UpdateJournalDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  summary?: string;
}
