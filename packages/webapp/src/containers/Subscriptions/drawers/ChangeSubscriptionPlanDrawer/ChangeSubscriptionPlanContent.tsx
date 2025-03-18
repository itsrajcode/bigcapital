// @ts-nocheck
import * as R from 'ramda';
import { Callout, Classes } from '@blueprintjs/core';
import { Box } from '@/components';
import { SubscriptionPlansPeriodSwitcher } from '@/containers/Setup/SetupSubscription/SubscriptionPlansPeriodSwitcher';
import { ChangeSubscriptionPlans } from './ChangeSubscriptionPlans';
import { useChangeSubscriptionPlanStore } from '../../BillingSubscription';


export default function ChangeSubscriptionPlanContent() {
  const { isFirstPlan } = useChangeSubscriptionPlanStore()
  return (
    <Box className={Classes.DRAWER_BODY}>
      <Box
        style={{
          maxWidth: 1024,
          margin: '0 auto',
          padding: '50px 20px 80px',
        }}
      >
        <Callout style={{ marginBottom: '2rem' }} icon={null}>
          {isFirstPlan 
            ? 'Choose your plan to get started. Simple plans, simple prices.' 
            : 'Change your current plan. Only pay for what you really need.'}
        </Callout>

        <SubscriptionPlansPeriodSwitcher />
        <ChangeSubscriptionPlans  />
      </Box>
    </Box>
  );
}
