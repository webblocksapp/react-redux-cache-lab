import { contactApiClient } from '@apiClients';
import { Contact, EntityParams } from '@interfaces';
import { useAppModel } from '@models';

export const useContactModel = () => {
  const appModel = useAppModel();
  const [listQuery, listState] = contactApiClient.useLazyListQuery();

  const list = async (params?: EntityParams<Contact>) => {
    try {
      await listQuery(params, true);
    } catch (error) {
      appModel.dispatchError(error);
    }
  };

  return {
    list,
    listState,
  };
};
