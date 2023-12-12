import { contactApiClient } from '@apiClients';
import { useState } from 'react';
import { Contact, EntityParams } from '@interfaces';

export const Example2 = () => {
  const [params, setParams] = useState<EntityParams<Contact>>({ _size: 10, _page: 0 });
  const { data } = contactApiClient.useListAndMergeQuery(params);
  const _page = params._page || 0;

  const next = () => {
    setParams((prev) => ({ ...prev, _page: _page + 1 }));
  };

  return (
    <div>
      <h5>Merged data</h5>
      <ul>
        {data?.map?.((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button disabled={_page > 0} onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
};
