import { Module } from '@nestjs/common';
import { JournalController } from './journal.controller';
import { journalsProviders } from './journal.provider';
import { JournalService } from './journal.service';

@Module({
  controllers: [JournalController],
  providers: [JournalService, ...journalsProviders],
  exports: [JournalService],
})
export class JournalModule {}
