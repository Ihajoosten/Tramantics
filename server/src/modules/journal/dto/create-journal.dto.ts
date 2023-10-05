import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJournalDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsNotEmpty()
  authorId: string;
}
