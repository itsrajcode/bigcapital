//@ts-nocheck

import { useRequestQuery } from '@/hooks/useQueryRequest';
import t from '@/hooks/query/types';


export function useProjectPurchases(id, props, requestProps) {
  return useRequestQuery(
    [t.PROJECT_PURCHASES, id],
    { method: 'get', url: `projects/${id}/expenses`, ...requestProps },
    {
      select:(res)=>({
        projectPurchases :res.data.data
      }),
      defaultData: {
        projectPurchases :[]
      },
      ...props,
    },
  );
} 