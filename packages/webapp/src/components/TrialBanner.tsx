import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Intent } from '@blueprintjs/core';
import { useSelector } from 'react-redux';
import { useSubscription } from '@/hooks/state/subscriptions';
import { getSubscriptionFactory } from '@/store/subscription/subscription.selectors';
import moment from 'moment';

const getMainSubscription = getSubscriptionFactory('main');

const TrialBanner: React.FC = () => {
  const history = useHistory();
  const { isSubscriptionOnTrial } = useSubscription('main');
  const subscription = useSelector(getMainSubscription);

  if (
    !isSubscriptionOnTrial || 
    !subscription || 
    typeof subscription !== 'object' ||
    !('status' in subscription) ||
    !('trialEndsAt' in subscription) ||
    subscription.status !== 'on_trial' || 
    !subscription.trialEndsAt
  ) {
    return null;
  }

  const trialEndDate = moment(subscription.trialEndsAt as string);
  let remainingDays = trialEndDate.diff(moment(), 'days');

  if (remainingDays < 0) {
    return null;
  }
  remainingDays = Math.max(0, remainingDays);

  const handleUpgradeClick = () => {
    history.push('/preferences/billing');
  };

  return (
    <div style={{ backgroundColor: '#FFD700', padding: '10px', textAlign: 'center', position: 'sticky', top: 0, zIndex: 1000 }}>
      <span>
        Trial Expires in {remainingDays} Day{remainingDays !== 1 ? 's' : ''}.
      </span>
      <Button
        intent={Intent.SUCCESS}
        text="Upgrade Plan"
        onClick={handleUpgradeClick}
        style={{ marginLeft: '15px' }}
        small
      />
    </div>
  );
};

export default TrialBanner; 