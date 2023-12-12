import { isDev } from '@utils';

export const handleError = (error: any) => {
  if (isDev()) {
    console.error(error);
  }

  if (error instanceof Error) {
    return error.message;
  } else {
    return 'An unknown error ocurred.';
  }
};
