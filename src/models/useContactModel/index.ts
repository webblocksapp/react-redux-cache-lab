import { contactApiClient } from '@apiClients';
import { Contact, EntityParams } from '@interfaces';

export const useContactModel = () => {
  const [listQuery, listState] = contactApiClient.useLazyListQuery();

  const list = async (params?: EntityParams<Contact>) => {
    await listQuery(params, true);
    if (listState.isError) {
      console.log(listState.error);
    }
  };

  return {
    list,
    listState,
  };
};
