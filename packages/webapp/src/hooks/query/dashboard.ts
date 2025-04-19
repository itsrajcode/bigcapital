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
  // Example properties - adjust according to your API response
  totalRevenue: number;
  newCustomers: number;
  activeSubscriptions: number;
  // Add other properties as needed
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
      // Assuming the raw response data needs transformation
      return transformToCamelCase(response.data) as DashboardAnalyticsResponse;
      // If no transformation is needed, you can just return response.data
      // return response.data as DashboardAnalyticsResponse;
    },
    {
      // Default options can be placed here
      ...options, // Spread any options passed to the hook
    },
  );
} 