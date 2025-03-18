// @ts-nocheck
import * as R from 'ramda';
import { Intent } from '@blueprintjs/core';
import { AppToaster, Group } from '@/components';
import { SubscriptionPlan } from '../../component/SubscriptionPlan';
import { SubscriptionPlansPeriod } from '@/store/plans/plans.reducer';
import { useSubscriptionPlans } from '@/hooks/constants/useSubscriptionPlans';
import { useChangeSubscriptionPlan } from '@/hooks/query/subscription';
import { withSubscriptionPlanMapper } from '../../component/withSubscriptionPlanMapper';
import { withPlans } from '../../withPlans';
import withDrawerActions from '@/containers/Drawer/withDrawerActions';
import { DRAWERS } from '@/constants/drawers';
import { useCreateSubscription } from '@/hooks/query/subscription';
import { useGetLemonSqueezyCheckout } from '@/hooks/query';
import { useChangeSubscriptionPlanStore } from '../../BillingSubscription';

export function ChangeSubscriptionPlans() {
  const subscriptionPlans = useSubscriptionPlans();
  const { isFirstPlan } = useChangeSubscriptionPlanStore();

  return (
    <Group spacing={14} noWrap align="stretch">
      {subscriptionPlans.map((plan, index) => (
        <SubscriptionPlanMapped plan={plan} />
      ))}
    </Group>
  );
}

export const SubscriptionPlanMapped = R.compose(
  withSubscriptionPlanMapper,
  withDrawerActions,
  withPlans(({ plansPeriod }) => ({ plansPeriod })),
)(
  ({
    openDrawer,
    closeDrawer,
    monthlyVariantId,
    annuallyVariantId,
    plansPeriod,
    ...props
  }) => {
    const { isFirstPlan } = useChangeSubscriptionPlanStore();
    const { mutateAsync: changeSubscriptionPlan, isLoading } =
      useChangeSubscriptionPlan();
    const { mutateAsync: createSubscription, isLoading: isCreating } =
      useGetLemonSqueezyCheckout();

    // Handles the subscribe button click
    const handleSubscribe =  () => {
      const variantId =
        plansPeriod === SubscriptionPlansPeriod.Monthly
          ? monthlyVariantId
          : annuallyVariantId;
      console.log('isFirstPlan', isFirstPlan);
      const action = isFirstPlan ? createSubscription : changeSubscriptionPlan;
      const actionProps = isFirstPlan ? { variantId } : { variant_id: variantId };
      action(actionProps)
        .then(async (res) => {
          if (!isFirstPlan) {
            closeDrawer(DRAWERS.CHANGE_SUBSCARIPTION_PLAN);
            AppToaster.show({
              message: isFirstPlan
                ? 'Subscription plan has been created.'
                : 'The subscription plan has been changed.',
              intent: Intent.SUCCESS,
            });
          } else {
            const checkoutUrl = await res.data.data.attributes.url;
            console.log('checkoutUrl', window.LemonSqueezy.Url);
            window.LemonSqueezy.Url.Open(checkoutUrl);
          }
        })
        .catch((error) => {
          console.log('error', error);
          AppToaster.show({
            message: 'Something went wrong.',
            intent: Intent.DANGER,
          });
        });
    };

    return (
      <SubscriptionPlan
        {...props}
        onSubscribe={handleSubscribe}
        subscribeButtonProps={{
          loading: isLoading || isCreating,
          // text: isFirstPlan ? 'Subscribe' : 'Change Plan'
        }}
      />
    );
  },
);
