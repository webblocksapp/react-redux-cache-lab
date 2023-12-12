import { contactApiClient } from '@apiClients';
import { v4 as uuid } from 'uuid';
import { useContactModel } from '../../models/useContactModel';
import { useEffect, useRef } from 'react';
import { Contact, EntityParams } from '@interfaces';

export const Example1 = () => {
  const { list, listState } = useContactModel();
  const filter = useRef<EntityParams<Contact>>({ _page: 0 });
  const totalPages = Number(listState.data?.pagination?.totalPages) || 0;
  const [createContact] = contactApiClient.useCreateMutation();

  const next = () => {
    filter.current = { ...filter.current, _page: (filter.current._page || 0) + 1 };
    list(filter.current);
  };

  const prev = () => {
    filter.current = { ...filter.current, _page: (filter.current._page || 0) - 1 };
    list(filter.current);
  };

  useEffect(() => {
    list(filter.current);
  }, []);

  return (
    <div>
      <h5>Paginated data</h5>
      {listState.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {listState.data?.contacts?.map?.((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button disabled={filter.current._page! <= 0} onClick={prev}>
          Prev
        </button>
        <button disabled={filter.current._page! >= totalPages - 1} onClick={next}>
          Next
        </button>
        <button
          onClick={() => {
            createContact({
              contact: { id: uuid(), name: 'xxxxx', phones: ['111111'], speedDial: false },
              cacheTag: filter.current,
            });
          }}
        >
          Add contact
        </button>
      </div>
    </div>
  );
};
