// @ts-nocheck
import { useQueryClient, useMutation } from 'react-query';
import { useRequestQuery } from '@/hooks/useQueryRequest';
import useApiRequest from '@/hooks/useRequest';
import t from './type';


const commonInvalidateQueries = (queryClient) => {
  // Invalidate projects.
  queryClient.invalidateQueries(t.PROJECTS);
  queryClient.invalidateQueries(t.PROJECT);
  // Invalidate project tasks.
  queryClient.invalidateQueries(t.PROJECT_TASKS);
};


export function useCreateProjectExpense(props) {
  const queryClient = useQueryClient();
  const apiRequest = useApiRequest();
  return useMutation(
    ([id, values]) => apiRequest.post(`/projects/${id}/expenses`, values),
    {
      onSuccess: (res, [id, values]) => {
        // Common invalidate queries.
        commonInvalidateQueries(queryClient);
      },
      ...props,
    },
  );
}
