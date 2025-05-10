// @ts-nocheck
import { useEffect } from 'react';
import * as R from 'ramda';
import { Redirect } from 'react-router-dom';
import { BillingPageBoot, useBillingPageBoot } from './BillingPageBoot';
import { BillingPageContent } from './BillingPageContent';
import { useDashboardMeta } from '@/hooks/query';
import withAlertActions from '../Alert/withAlertActions';
import withDashboardActions from '../Dashboard/withDashboardActions';
import { Box, Card } from '@/components';
import { Text, Button, Intent, Callout, H2 } from '@blueprintjs/core';
import { useChangeSubscriptionPlanStore } from './BillingSubscription';
import { DRAWERS } from '@/constants/drawers';
import withDrawerActions from '../Drawer/withDrawerActions';

function BillingPageRoot({
  openAlert,
  openDrawer,
  // #withAlertActions
  changePreferencesPageTitle,
}) {
  const { data: dashboardMeta } = useDashboardMeta({
    keepPreviousData: true,
  });
  
  const { mainSubscription, isSubscriptionsLoading } = useBillingPageBoot();
  const { setIsFirstPlan } = useChangeSubscriptionPlanStore();
  
  let hasExpired = false;
  
  if (isSubscriptionsLoading) {
    hasExpired = false;
    console.log('[DEBUG] BillingPage: Subscriptions are loading...');
  } else if (!mainSubscription) {
    hasExpired = true;
    console.log('[DEBUG] BillingPage: No mainSubscription found');
  } else {
    const isActive = mainSubscription.active === true;
    const isOnTrial = mainSubscription.on_trial === true || mainSubscription.status === 'on_trial';
    
    hasExpired = !isActive && !isOnTrial;
    console.log(`[DEBUG] BillingPage: mainSubscription status check - active: ${isActive}, onTrial: ${isOnTrial}, hasExpired: ${hasExpired}`);
    console.log('[DEBUG] mainSubscription:', mainSubscription);
  }

  useEffect(() => {
    const title = hasExpired 
      ? 'Subscription Required' 
      : 'Billing';
    
    changePreferencesPageTitle(title);
  }, [changePreferencesPageTitle, hasExpired]);

  // In case the edition is not Bigcapital Cloud, redirect to the homepage.
  // if (!dashboardMeta.is_bigcapital_cloud) {
  //   return <Redirect to={{ pathname: '/' }} />;
  // }

  const handleSubscribeClick = () => {
    setIsFirstPlan(true);
    openDrawer(DRAWERS.CHANGE_SUBSCARIPTION_PLAN);
  };

  return (
    <BillingPageBoot>
      {hasExpired && (
        <Card style={{ 
          marginBottom: '20px'
        }}>
          <Callout
            icon="warning-sign"
            intent={Intent.DANGER}
            title="Your subscription has expired"
          >
            <Box style={{ marginTop: '10px', marginBottom: '15px' }}>
              <Text style={{ fontSize: '14px' }}>
                Your access to application features has been restricted. To continue using all features, please subscribe to a plan.
              </Text>
            </Box>
            <Button 
              intent={Intent.PRIMARY} 
              onClick={handleSubscribeClick}
              style={{ marginRight: '10px' }}
            >
              Subscribe Now
            </Button>
          </Callout>
        </Card>
      )}
      <BillingPageContent hasExpired={hasExpired} />
    </BillingPageBoot>
  );
}

export default R.compose(
  withAlertActions,
  withDashboardActions,
  withDrawerActions,
)(BillingPageRoot);
