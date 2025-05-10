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
  console.log('[DEBUG] subscriptions:', subscriptions);
  // Prioritize the active 'main' subscription
  const activeMainSubscription = subscriptions.find(
    (s: any) => s.slug === 'main' && s.active === true
  );

  if (activeMainSubscription) {
    console.log('[DEBUG] Found active main subscription:', activeMainSubscription);
    return activeMainSubscription;
  }

  // Fallback: if no *active* 'main' subscription,
  // return the first 'main' subscription found (which might be expired/cancelled).
  // The UI (like in BillingPage.tsx with its 'hasExpired' logic) should use the
  // active status from this returned object to make final display decisions.
  const firstMainSubscription = subscriptions.find((s: any) => s.slug === 'main') || null;
  if (firstMainSubscription) {
    console.log('[DEBUG] No active main subscription found. Falling back to first main subscription (could be inactive/canceled):', firstMainSubscription);
  } else {
    console.log('[DEBUG] No main subscription found at all (slug=\'main\').');
  }
  return firstMainSubscription;
}
export function BillingPageBoot({ children }: BillingPageBootProps) {
  const {
    isLoading: isSubscriptionsLoading,
    data: subscriptionsRes,
    isError,
  } = useGetSubscriptions();
  console.log('subscriptionsRes', subscriptionsRes);

  const mainSubscription = checkSubscriptionStatus(subscriptionsRes);
  console.log('[DEBUG] mainSubscription:', mainSubscription);

  const value = {
    isSubscriptionsLoading,
    subscriptions: subscriptionsRes?.subscriptions,
    mainSubscription,
    isError,
  };
  return <BillingBoot.Provider value={value}>{children}</BillingBoot.Provider>;
}

export const useBillingPageBoot = () => React.useContext(BillingBoot);
