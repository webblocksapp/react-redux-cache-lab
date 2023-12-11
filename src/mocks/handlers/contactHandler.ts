import { LOCAL_BASE_URL, objectMatchCriteria, paginateData } from '@utils';
import { HttpResponse, delay, http } from 'msw';
import { v4 as uuid } from 'uuid';
import { Contact } from '@interfaces';
import { data } from '../data';

export const contactHandler = [
  // List
  http.get(`${LOCAL_BASE_URL}/contacts`, async ({ request }) => {
    const url = new URL(request.url);
    const size: any = url.searchParams.get('_size');
    const page: any = url.searchParams.get('_page');
    const filter: any = url.searchParams.get('_filter');
    let contacts = data.contacts.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    if (filter) {
      contacts = contacts.filter((item) => objectMatchCriteria(item, filter));
    }

    const { content, totalPages } = paginateData(contacts, {
      limit: size,
      page,
    });

    await delay(200);

    return HttpResponse.json(
      {
        totalElements: contacts.length,
        totalPages,
        content,
        pageable: {
          offset: 0,
          pageSize: size,
          pageNumber: page,
        },
      },
      { status: 200 }
    );
  }),
  // Create
  http.post(`${LOCAL_BASE_URL}/contacts`, async ({ request }) => {
    const contact = (await request.json()) as Contact;
    let body = { id: uuid(), ...contact };
    await delay(2000);
    return HttpResponse.json(body, { status: 200 });
  }),
  // Read
  http.get(`${LOCAL_BASE_URL}/contacts/:id`, async ({ params }) => {
    const { id } = params;
    await delay(2000);
    return HttpResponse.json(
      data.contacts.find((item) => item.id == id),
      { status: 200 }
    );
  }),
  // Update
  http.put(`${LOCAL_BASE_URL}/contacts/:id`, async ({ request }) => {
    await delay(2000);
    return HttpResponse.json(await request.json(), { status: 200 });
  }),
  // Remove
  http.delete(`${LOCAL_BASE_URL}/contacts/:id`, async ({ params }) => {
    const { id } = params;
    await delay(2000);
    return HttpResponse.json(
      data.contacts.find((item) => item.id == id),
      { status: 200 }
    );
  }),
];
