import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Contact, EntityParams, ListResponse } from '@interfaces';
import { LOCAL_BASE_URL } from '@utils';

// Define a service using a base URL and expected endpoints
export const contactApiClient = createApi({
  reducerPath: 'contactState',
  baseQuery: fetchBaseQuery({ baseUrl: LOCAL_BASE_URL }),
  endpoints: (builder) => ({
    list: builder.query<Contact[], EntityParams<Contact> | undefined>({
      query: () => 'contacts',
      transformResponse: (data: ListResponse<Contact>) => {
        return data.content;
      },
    }),
  }),
});
