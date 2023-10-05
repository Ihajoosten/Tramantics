import { Journal } from './journal.entity';
import { JOURNAL_REPOSITORY } from '../../core/constants';

export const journalsProviders = [
  {
    provide: JOURNAL_REPOSITORY,
    useValue: Journal,
  },
];
