import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query';
import useApiRequest from '@/hooks/useRequest';
import { transformToCamelCase } from '@/utils';

// Define a unique key for this query
const QueryKeys = {
  DashboardAnalytics: 'DashboardAnalytics',
};

// Define the expected response structure (replace with actual structure if known)
export interface DashboardAnalyticsResponse {
  analytics_dashboard_data: {
    tenant_user: any;
    top_selling_items: any[];
    income_expense_overview: any[];
    top_unpaid_invoices: any[];
    cash_and_bank_balances: any[];
    invoice_statuses: any[];
  }
}

// Define date range parameters interface
export interface DashboardAnalyticsParams {
  from_date?: string;
  to_date?: string;
  [key: string]: any; // Allow for other parameters
}

/**
 * Custom hook to fetch dashboard analytics data.
 * @param options Optional configuration including params for date filtering.
 * @returns Query result object for dashboard analytics.
 */
export function useDashboardAnalytics(
  options?: {
    params?: DashboardAnalyticsParams;
  } & UseQueryOptions<
    DashboardAnalyticsResponse, 
    Error, 
    DashboardAnalyticsResponse
  >,
): UseQueryResult<DashboardAnalyticsResponse, Error> {
  const apiRequest = useApiRequest();
  const params = options?.params || {};

  return useQuery<DashboardAnalyticsResponse, Error, DashboardAnalyticsResponse>(
    [QueryKeys.DashboardAnalytics, params], // Include params in the query key for proper refetching
    async () => {
      const response = await apiRequest.get('dashboard/analytics', { 
        params // Pass date range parameters to the API
      });
      console.log('[DashboardService] Raw API Response:', response.data);
      console.log('[DashboardService] Query Params:', params);
      // Return the raw data without transformation
      return response.data;
    },
    {
      // Default options can be placed here
      ...options, // Spread any options passed to the hook
    },
  );
} 