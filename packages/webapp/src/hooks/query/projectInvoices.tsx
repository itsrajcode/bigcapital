import { UseQueryOptions } from 'react-query';
import { useRequestQuery } from '@/hooks/useQueryRequest';
import { AxiosResponse } from 'axios';

export interface ProjectInvoice {
  id: number;
  amount: number;
  invoiceDate: Date;
  dueDate: Date;
  invoiceNo: string;
  referenceNo: string;
  projectId: number;
  status: string;
  type: string;
  balance: number;
  total: number;
  entries: Array<{
    itemId: number;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
  customer: {
    id: number;
    displayName: string;
  };
}

export interface GetProjectInvoicesResponse {
  invoices: ProjectInvoice[];
  message: string;
}

const PROJECT_INVOICES = 'PROJECT_INVOICES';

/**
 * Retrieves all invoices associated with projects.
 */
export function useProjectInvoices(
  query?: Record<string, any>,
  options?: UseQueryOptions<AxiosResponse<GetProjectInvoicesResponse>>
) {
  return useRequestQuery(
    [PROJECT_INVOICES, query],
    {
      method: 'get',
      url: 'projects/invoices',
      params: query,
    },
    {
      select: (res: AxiosResponse<GetProjectInvoicesResponse>) => res.data,
      defaultData: {
        invoices: [],
        message: '',
      },
      ...options,
    }
  );
} 