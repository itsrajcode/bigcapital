// @ts-nocheck
import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useSubscription } from '@/hooks/state/subscriptions';

/**
 * Ensures there is an active subscription or trial.
 * If neither exists, redirects to the billing page.
 */
export function EnsureActiveSubscriptionOrRedirect({
  children,
  redirectTo = '/billing',
}) {
  const { isSubscriptionActive, isSubscriptionOnTrial } = useSubscription('main');
  const location = useLocation();
  
  // For debugging
  console.log('isSubscriptionActive', isSubscriptionActive);
  console.log('isSubscriptionOnTrial', isSubscriptionOnTrial);
  
  // Allow access only if there's an active subscription or the user is still on trial
  const hasValidAccess = isSubscriptionActive || isSubscriptionOnTrial;
  
  // Don't redirect if we're already on the billing page to prevent loops
  const isBillingPage = location.pathname === '/billing';
  
  if (!hasValidAccess && !isBillingPage) {
    return <Redirect to={{ pathname: redirectTo }} />;
  }

  return <>{children}</>;
} 