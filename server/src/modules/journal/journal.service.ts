import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Journal } from './journal.entity';
import { JOURNAL_REPOSITORY } from 'src/core/constants';
import { CreateJournalDTO } from './dto/create-journal.dto';
import { UpdateJournalDTO } from './dto/update.journal.dto';

@Injectable()
export class JournalService {
  constructor(
    @Inject(JOURNAL_REPOSITORY)
    private readonly journalRepo: typeof Journal,
  ) {}

  async create(createJournalDTO: CreateJournalDTO): Promise<Journal> {
    return this.journalRepo.create(createJournalDTO);
  }

  async findAll(): Promise<Journal[]> {
    return this.journalRepo.findAll();
  }

  async findOne(uuid: string): Promise<Journal> {
    const journal = await this.journalRepo.findByPk(uuid, {
      include: ['user', 'trades'],
    });
    if (!journal) {
      throw new NotFoundException('Journal not found');
    }
    return journal;
  }

  async update(
    uuid: string,
    updateJournal: UpdateJournalDTO,
  ): Promise<Journal> {
    const journal = await this.findOne(uuid);
    if (!journal) throw new NotFoundException('Journal not found');

    await this.journalRepo.update(updateJournal, { where: { uuid } });
    // Fetch the Trade again to get the updated instance
    const updatedJournal = await this.findOne(uuid);
    return updatedJournal;
  }

  async remove(uuid: string): Promise<void> {
    const journal = await this.findOne(uuid);
    if (!journal) throw new NotFoundException('Journal not found');
    await this.journalRepo.destroy({ where: { uuid } });
  }
}
