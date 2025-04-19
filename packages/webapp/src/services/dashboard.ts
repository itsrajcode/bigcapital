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

/**
 * Custom hook to fetch dashboard analytics data.
 * @param options Optional react-query options.
 * @returns Query result object for dashboard analytics.
 */
export function useDashboardAnalytics(
  options?: UseQueryOptions<
    DashboardAnalyticsResponse, // Query function return type
    Error, // Error type
    DashboardAnalyticsResponse // Data type returned by useQuery
  >,
): UseQueryResult<DashboardAnalyticsResponse, Error> {
  const apiRequest = useApiRequest();

  return useQuery<DashboardAnalyticsResponse, Error, DashboardAnalyticsResponse>(
    [QueryKeys.DashboardAnalytics], // Unique query key
    async () => {
      const response = await apiRequest.get('dashboard/analytics', {});
      console.log('[DashboardService] Raw API Response:', response.data);
      // Return the raw data without transformation
      return response.data;
    },
    {
      // Default options can be placed here
      ...options, // Spread any options passed to the hook
    },
  );
} 