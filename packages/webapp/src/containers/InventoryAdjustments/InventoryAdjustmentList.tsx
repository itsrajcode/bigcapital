// @ts-nocheck
import React from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { FormattedMessage as T, Icon } from '@/components';

import '@/style/pages/InventoryAdjustments/List.scss';

import { DashboardContentTable, DashboardPageContent } from '@/components';
import { DialogsName } from '@/constants/dialogs';

import { InventoryAdjustmentsProvider } from './InventoryAdjustmentsProvider';
import InventoryAdjustmentTable from './InventoryAdjustmentTable';

import withInventoryAdjustments from './withInventoryAdjustments';
import withDialogActions from '@/containers/Dialog/withDialogActions';
import { useCreateInventoryAdjustment } from '@/hooks/query';

import { compose, transformTableStateToQuery } from '@/utils';

/**
 * Inventory Adjustment List.
 */
function InventoryAdjustmentList({
  // #withInventoryAdjustments
  inventoryAdjustmentTableState,
  // #withDialogActions
  openDialog,
}) {
  // Handle create inventory adjustment.
  const handleCreateInventoryAdjustment = () => {
    openDialog(DialogsName.InventoryAdjustmentForm);
  };

  return (
    <InventoryAdjustmentsProvider
      query={transformTableStateToQuery(inventoryAdjustmentTableState)}
    >
      <DashboardPageContent>
        <div className="inventory-adjustment-header">
          <Button
            className="inventory-adjustment-button"
            intent={Intent.PRIMARY}
            icon={<Icon icon="plus" iconSize={16} />}
            onClick={handleCreateInventoryAdjustment}
          >
            <T id={'new_adjustment'} />
          </Button>
        </div>
        <DashboardContentTable>
          <InventoryAdjustmentTable />
        </DashboardContentTable>
      </DashboardPageContent>
    </InventoryAdjustmentsProvider>
  );
}

export default compose(
  withInventoryAdjustments(({ inventoryAdjustmentTableState }) => ({
    inventoryAdjustmentTableState,
  })),
  withDialogActions,
)(InventoryAdjustmentList);
