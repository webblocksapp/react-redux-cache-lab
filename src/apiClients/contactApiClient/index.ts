import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Contact, EntityParams, ListResponse, Pagination } from '@interfaces';
import { LOCAL_BASE_URL, axiosLocal } from '@utils';
import { createEntityAdapter } from '@reduxjs/toolkit';

const methods = {
  list: async (
    params?: EntityParams<Contact>
  ): Promise<{
    contacts: Contact[];
    pagination: Pagination;
  }> => {
    params = { _size: 10, _page: 0, ...params };
    const { data } = await axiosLocal.get<ListResponse<Contact>>('/contacts', {
      params,
    });

    return {
      contacts: data.content,
      pagination: {
        totalPages: data.totalPages,
        size: data.pageable.pageSize,
        page: data.pageable.pageNumber,
        totalElements: data.totalElements,
      },
    };
  },
  read: async (id: string) => {
    const response = await axiosLocal.get<Contact>(`/contacts/${id}`);
    return response.data;
  },
  create: async (data: Contact) => {
    const response = await axiosLocal.post<Contact>('/contacts', data);
    return response.data;
  },
  update: async (id: string, data: Contact) => {
    const response = await axiosLocal.put<Contact>(`/contacts/${id}`, data);
    return response.data;
  },
  remove: async (id: string) => {
    const response = await axiosLocal.delete<Contact>(`/contacts/${id}`);
    return response.data;
  },
};

export const contactsAdapter = createEntityAdapter<Contact>();
export const initialState = contactsAdapter.getInitialState();

export const contactApiClient = createApi({
  reducerPath: 'contactState',
  baseQuery: fetchBaseQuery({ baseUrl: LOCAL_BASE_URL }),
  tagTypes: ['Contacts'],
  endpoints: (builder) => ({
    list: builder.query<Contact[], EntityParams<Contact> | undefined>({
      queryFn: async (params) => {
        const { contacts } = await methods.list(params);
        return { data: contacts };
      },
      providesTags: ['Contacts'],
    }),
    listAndMerge: builder.query<Contact[], EntityParams<Contact> | undefined>({
      queryFn: async (params) => {
        const { contacts } = await methods.list(params);
        return { data: contacts };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    create: builder.mutation<Contact, Contact>({
      queryFn: async (data) => {
        const contact = await methods.create(data);
        return { data: contact };
      },
      invalidatesTags: ['Contacts'],
    }),
  }),
});
