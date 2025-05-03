// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import intl from 'react-intl-universal';
import { Tab } from '@blueprintjs/core';

import { useAbilityContext } from '@/hooks/utils';
import { DrawerMainTabs } from '@/components';
import { PaymentReceiveAction, AbilitySubject } from '@/constants/abilityOption';
import InvoiceDetailActionsBar from './InvoiceDetailActionsBar';
import InvoiceGLEntriesTable from './InvoiceGLEntriesTable';
import InvoicePaymentTransactionsTable from './InvoicePaymentTransactions/InvoicePaymentTransactionsTable';
import InvoiceDetailTab from './InvoiceDetailTab';

/**
 * Invoice details tabs.
 * @returns {React.JSX}
 */
function InvoiceDetailsTabs() {
  const ability = useAbilityContext();

  // Check if we have a valid ability instance with the can method
  const canViewPaymentTransactions = React.useMemo(() => {
    try {
      return ability?.can?.(PaymentReceiveAction.View, AbilitySubject.PaymentReceive) || false;
    } catch (error) {
      return false;
    }
  }, [ability]);

  return (
    <DrawerMainTabs
      renderActiveTabPanelOnly={true}
      defaultSelectedTabId="details"
    >
      <Tab
        title={intl.get('overview')}
        id={'details'}
        panel={<InvoiceDetailTab />}
      />
      <Tab
        title={intl.get('journal_entries')}
        id={'journal_entries'}
        panel={<InvoiceGLEntriesTable />}
      />
      {canViewPaymentTransactions && (
        <Tab
          title={intl.get('payment_transactions')}
          id={'payment_transactions'}
          panel={<InvoicePaymentTransactionsTable />}
        />
      )}
    </DrawerMainTabs>
  );
}

/**
 * Invoice view detail.
 * @returns {React.JSX}
 */
export default function InvoiceDetail() {
  return (
    <InvoiceDetailsRoot>
      <InvoiceDetailActionsBar />
      <InvoiceDetailsTabs />
    </InvoiceDetailsRoot>
  );
}

export const InvoiceDetailsRoot = styled.div``;
