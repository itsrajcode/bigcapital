// @ts-nocheck
import React, { useState, createContext, useContext } from 'react';
import { DialogContent } from '@/components';
import { Features } from '@/constants';
import { useFeatureCan } from '@/hooks/state';
import {
  useItem,
  useItems,
  useAccounts,
  useBranches,
  useWarehouses,
  useCreateInventoryAdjustment,
} from '@/hooks/query';

const InventoryAdjustmentContext = createContext();

/**
 * Inventory adjustment dialog provider.
 */
function InventoryAdjustmentFormProvider({ itemId, dialogName, children }) {
  // Features guard.
  const { featureCan } = useFeatureCan();
  const isWarehouseFeatureCan = featureCan(Features.Warehouses);
  const isBranchFeatureCan = featureCan(Features.Branches);

  // Fetch items list
  const { data: itemsData = { items: [] }, isLoading: isItemsLoading } = useItems({});

  // Fetches accounts list.
  const { isFetching: isAccountsLoading, data: accounts = [] } = useAccounts();

  // Check if itemId is valid (not undefined, null, or empty string)
  const isValidItemId = itemId && itemId !== '' && itemId !== 'undefined' && itemId !== 'null';

  // Fetches the item details - make it non-blocking by setting enabled to false if itemId is not provided
  const { isFetching: isItemLoading, data: item = {} } = useItem(
    isValidItemId ? itemId : null, 
    {}, 
    { enabled: Boolean(isValidItemId) }
  );

  // Fetch warehouses list.
  const {
    data: warehouses = [],
    isLoading: isWarehousesLoading,
    isSuccess: isWarehousesSuccess,
  } = useWarehouses({}, { enabled: isWarehouseFeatureCan });

  // Fetches the branches list.
  const {
    data: branches = [],
    isLoading: isBranchesLoading,
    isSuccess: isBranchesSuccess,
  } = useBranches({}, { enabled: isBranchFeatureCan });

  const { mutateAsync: createInventoryAdjMutate } = useCreateInventoryAdjustment();

  // Submit payload.
  const [submitPayload, setSubmitPayload] = useState({});

  // State provider.
  const provider = {
    item,
    itemId: isValidItemId ? itemId : '',
    items: itemsData.items || [],
    branches,
    warehouses,
    accounts,

    dialogName,
    submitPayload,

    isBranchesSuccess,
    isWarehousesSuccess,
    isAccountsLoading,
    isItemLoading,
    isItemsLoading,
    isWarehousesLoading,
    isBranchesLoading,

    createInventoryAdjMutate,
    setSubmitPayload,
  };

  // Determine if we're still loading critical data
  const isLoading = (isValidItemId && isItemLoading) || isAccountsLoading || isItemsLoading || 
    (isWarehouseFeatureCan && isWarehousesLoading) || 
    (isBranchFeatureCan && isBranchesLoading);

  return (
    <DialogContent isLoading={isLoading}>
      <InventoryAdjustmentContext.Provider value={provider}>
        {children}
      </InventoryAdjustmentContext.Provider>
    </DialogContent>
  );
}

export const useInventoryAdjContext = () => useContext(InventoryAdjustmentContext);
export { InventoryAdjustmentFormProvider };
