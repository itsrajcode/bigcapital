// @ts-nocheck
import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useSubscription } from '@/hooks/state/subscriptions';
import { useBillingPageBoot } from '@/containers/Subscriptions/BillingPageBoot';

/**
 * Ensures there is an active subscription or trial.
 * If neither exists, redirects to the billing page.
 */
export function EnsureActiveSubscriptionOrRedirect({
  children,
  redirectTo = '/billing',
}) {
  // Get the main subscription from both hooks
  const { isSubscriptionActive, isSubscriptionOnTrial } = useSubscription('main');
  const { mainSubscription } = useBillingPageBoot();
  const location = useLocation();
  
  // First check using mainSubscription (direct from API)
  let hasMainSubscriptionAccess = false;
  if (mainSubscription) {
    const isActive = mainSubscription.active === true;
    const isOnTrial = mainSubscription.on_trial === true || mainSubscription.status === 'on_trial';
    hasMainSubscriptionAccess = isActive || isOnTrial;
  }
  
  // For debugging
  console.log('mainSubscription:', mainSubscription);
  console.log('isSubscriptionActive from hook:', isSubscriptionActive);
  console.log('isSubscriptionOnTrial from hook:', isSubscriptionOnTrial);
  console.log('hasMainSubscriptionAccess:', hasMainSubscriptionAccess);
  
  // Combine both checks - if either indicates valid access, allow it
  const hasValidAccess = hasMainSubscriptionAccess || isSubscriptionActive || isSubscriptionOnTrial;
  console.log('Final hasValidAccess:', hasValidAccess);
  
  // Don't redirect if we're already on the billing page to prevent loops
  const isBillingPage = location.pathname === '/billing' || location.pathname === '/preferences/billing';
  console.log('Current path:', location.pathname, 'isBillingPage:', isBillingPage);
  
  if (!hasValidAccess && !isBillingPage) {
    console.log('Redirecting to billing page due to no valid subscription access');
    return <Redirect to={{ pathname: redirectTo }} />;
  }

  return <>{children}</>;
} 