import React, { createContext } from 'react';
import { useGetSubscriptions } from '@/hooks/query/subscription';

interface BillingBootContextValues {
  isSubscriptionsLoading: boolean;
  subscriptions: any;
  isError: any;
  mainSubscription: any;
}

const BillingBoot = createContext<BillingBootContextValues>(
  {} as BillingBootContextValues,
);

interface BillingPageBootProps {
  children: React.ReactNode;
}
function checkSubscriptionStatus(subscriptionsRes: any) {
  // Ensure subscriptions is always an array, even if undefined or null
  const subscriptions = Array.isArray(subscriptionsRes?.subscriptions)
    ? subscriptionsRes.subscriptions
    : [];
  // Find main subscription or return null if not found
  return subscriptions.find((s: any) => s.slug === 'main') || null;
}
export function BillingPageBoot({ children }: BillingPageBootProps) {
  const {
    isLoading: isSubscriptionsLoading,
    data: subscriptionsRes,
    isError,
  } = useGetSubscriptions();
  console.log('subscriptionsRes', subscriptionsRes);

  const mainSubscription = checkSubscriptionStatus(subscriptionsRes);

  const value = {
    isSubscriptionsLoading,
    subscriptions: subscriptionsRes?.subscriptions,
    mainSubscription,
    isError,
  };
  return <BillingBoot.Provider value={value}>{children}</BillingBoot.Provider>;
}

export const useBillingPageBoot = () => React.useContext(BillingBoot);
