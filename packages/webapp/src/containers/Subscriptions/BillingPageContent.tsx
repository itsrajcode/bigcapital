// @ts-nocheck
import { Box, Group } from '@/components';
import { Spinner, Text, H3, Card, Divider } from '@blueprintjs/core';
import { Subscription } from './BillingSubscription';
import { useBillingPageBoot } from './BillingPageBoot';
import styles from './BillingPageContent.module.scss';

export function BillingPageContent({ hasExpired = false }) {
  const { isSubscriptionsLoading, subscriptions, isError } = useBillingPageBoot();
  if (isError) {
    return <div>Error loading subscriptions</div>;
  }

  if (isSubscriptionsLoading || !subscriptions) {
    return <Spinner size={30} />;
  }

  return (
    <Box className={styles.root}>
      {hasExpired ? (
        <Card>
          <H3>Select a Plan to Continue</H3>
          <Divider />
          <Text style={{ marginTop: '10px', marginBottom: '20px' }}>
            Your subscription has expired. Subscribe to a plan below to regain access to all features.
          </Text>
        </Card>
      ) : (
        <Text>
          Only pay for what you really need. All plans come with 24/7 customer support.
        </Text>
      )}

      <Group style={{ marginTop: '2rem' }}>
        <Subscription />
      </Group>
    </Box>
  );
}
