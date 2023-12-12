import { contactApiClient } from '@apiClients';
import { v4 as uuid } from 'uuid';
import { useContactModel } from '../../models/useContactModel';
import { useEffect } from 'react';

export const Example1 = () => {
  const { list, listState } = useContactModel();
  const page = Number(listState.data?.pagination?.page) || 0;
  const totalPages = Number(listState.data?.pagination?.totalPages) || 0;
  const [createContact, { isError }] = contactApiClient.useCreateMutation();

  const next = () => {
    list({ _page: page + 1 });
  };

  const prev = () => {
    list({ _page: page - 1 });
  };

  useEffect(() => {
    list({ _page: 0 });
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
        <button disabled={page <= 0} onClick={prev}>
          Prev
        </button>
        <button disabled={page >= totalPages - 1} onClick={next}>
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
