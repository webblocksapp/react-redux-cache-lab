import { Contact } from '@interfaces';
import { createRandomContact } from '@mocks/fakers';

export const contacts: Contact[] = Array(20)
  .fill(null)
  .map(() => createRandomContact());
