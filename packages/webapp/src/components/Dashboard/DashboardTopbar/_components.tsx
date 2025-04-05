// @ts-nocheck
import React from 'react';
import { Button, Classes } from '@blueprintjs/core';
import { useGetUniversalSearchTypeOptions } from '@/containers/UniversalSearch/utils';
import { Icon, FormattedMessage as T } from '@/components';
import { useSubscription } from '@/hooks/state/subscriptions';
import { useBillingPageBoot } from '@/containers/Subscriptions/BillingPageBoot';

export function DashboardTopbarSubscriptionMessage() {
  const { isSubscriptionOnTrial } = useSubscription('main');
  const { mainSubscription } = useBillingPageBoot();

  if (!mainSubscription) return null;

  const statusMessage = isSubscriptionOnTrial
    ? `Trial ends in ${mainSubscription.trialEndsAtFormatted}`
    : mainSubscription.statusFormatted;

  return (
    <div class="dashboard__topbar-subscription-msg">
      <span>
        <T id={statusMessage} />
      </span>
    </div>
  );
}

export function DashboardHamburgerButton({ ...props }) {
  return (
    <Button minimal={true} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        role="img"
        focusable="false"
      >
        <title>
          <T id={'menu'} />
        </title>
        <path
          fill="#0047C3"
          d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
        />
      </svg>
    </Button>
  );
}

/**
 * Dashboard quick search button.
 */
export function DashboardQuickSearchButton({ ...rest }) {
  const searchTypeOptions = useGetUniversalSearchTypeOptions();

  // Can't continue if there is no any search type option.
  if (searchTypeOptions.length <= 0) {
    return null;
  }
  return (
    <Button
      className={Classes.MINIMAL}
      icon={<Icon icon={'search-24'} iconSize={20} color={'#666D80'} />}
      {...rest}
    />
  );
}