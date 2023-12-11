import { flattenObject } from '@utils';

/**
 * Checks if any object matches any criteria
 */
export const objectMatchCriteria = <T>(data: T, criteria: string) => {
  const flattenedData = flattenObject(data);
  for (let value of Object.values(flattenedData)) {
    if (String(value).match(new RegExp(`${criteria}`, 'i'))) return true;
  }
  return false;
};
