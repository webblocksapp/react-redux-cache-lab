import { contactApiClient } from '@apiClients';

export const App = () => {
  const { data } = contactApiClient.useListQuery(undefined);

  return <>{JSON.stringify(data)}</>;
};
