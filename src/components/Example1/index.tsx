import { contactApiClient } from '@apiClients';
import { useState } from 'react';
import { Contact, EntityParams } from '@interfaces';
import { v4 as uuid } from 'uuid';

export const Example1 = () => {
  const [params, setParams] = useState<EntityParams<Contact>>({ _size: 10, _page: 0 });
  const { data } = contactApiClient.useListQuery(params);
  const [createContact, { isError }] = contactApiClient.useCreateMutation();
  const _page = params._page || 0;

  const next = () => {
    setParams((prev) => ({ ...prev, _page: _page + 1 }));
  };

  const prev = () => {
    setParams((prev) => ({ ...prev, _page: _page - 1 }));
  };

  return (
    <div>
      <h5>Paginated data</h5>
      <ul>
        {data?.map?.((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button disabled={_page <= 0} onClick={prev}>
          Prev
        </button>
        <button disabled={_page > 0} onClick={next}>
          Next
        </button>
        <button
          onClick={() => {
            createContact({
              id: uuid(),
              name: 'xxxxx',
              phones: ['111111'],
              speedDial: false,
            });
          }}
        >
          Add contact
        </button>
        {isError ? 'An error ocurred' : ''}
      </div>
    </div>
  );
};
