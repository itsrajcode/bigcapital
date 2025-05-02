// @ts-nocheck
import { useEffect } from 'react';
import intl from 'react-intl-universal';
import { useFormikContext } from 'formik';
import { find } from 'lodash';
import { useInventoryAdjContext } from './InventoryAdjustmentFormProvider';

/**
 * Retrieves the adjustment type options.
 */
export const getAdjustmentTypeOptions = () => [
  { name: intl.get('decrement'), value: 'decrement' },
  { name: intl.get('increment'), value: 'increment' },
];

/**
 * Memorized adjustment type options.
 */
export const useGetAdjustmentTypeOptions = () => {
  return getAdjustmentTypeOptions();
};

/**
 * Sets the primary warehouse to form.
 */
export const useSetPrimaryWarehouseToForm = () => {
  const { setFieldValue } = useFormikContext();
  const { warehouses, isWarehousesSuccess } = useInventoryAdjContext();

  useEffect(() => {
    if (isWarehousesSuccess && warehouses && warehouses.length > 0) {
      const primaryWarehouse = find(warehouses, { primary: true });

      if (primaryWarehouse) {
        setFieldValue('warehouse_id', primaryWarehouse.id);
      }
    }
  }, [warehouses, isWarehousesSuccess, setFieldValue]);
};

/**
 * Sets the primary branch to form.
 */
export const useSetPrimaryBranchToForm = () => {
  const { setFieldValue } = useFormikContext();
  const { branches, isBranchesSuccess } = useInventoryAdjContext();

  useEffect(() => {
    if (isBranchesSuccess && branches && branches.length > 0) {
      const primaryBranch = find(branches, { primary: true });

      if (primaryBranch) {
        setFieldValue('branch_id', primaryBranch.id);
      }
    }
  }, [branches, isBranchesSuccess, setFieldValue]);
};

/**
 * Safely convert value to number
 */
const safeNumber = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return 0;
  }
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
};

/**
 * Increment quantity.
 */
export const incrementQuantity = (quantity, quantityOnHand) => {
  const safeQty = safeNumber(quantity);
  const safeQtyOnHand = safeNumber(quantityOnHand);
  return safeQtyOnHand + safeQty;
};

/**
 * Decrement quantity.
 */
export const decrementQuantity = (quantity, quantityOnHand) => {
  const safeQty = safeNumber(quantity);
  const safeQtyOnHand = safeNumber(quantityOnHand);
  const result = safeQtyOnHand - safeQty;
  return result >= 0 ? result : 0;
};

/**
 * Diff quantity.
 */
export const diffQuantity = (quantity, quantityOnHand, type) => {
  return type === 'increment'
    ? incrementQuantity(quantity, quantityOnHand)
    : decrementQuantity(quantity, quantityOnHand);
};
