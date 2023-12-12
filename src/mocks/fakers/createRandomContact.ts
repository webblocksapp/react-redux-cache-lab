import { Contact } from '@interfaces';
import { faker } from '@faker-js/faker';

export const createRandomContact = (): Contact => {
  const phoneNumber1 = String(faker.number.int({ min: 2000000000, max: 9999999999 }));

  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phones: [phoneNumber1],
    address: `${faker.location.street()}`,
    speedDial: faker.helpers.arrayElement([true, false]),
    speedDialShortcut: 'A',
    notes: ['Note 1', 'Note 2'],
  };
};
