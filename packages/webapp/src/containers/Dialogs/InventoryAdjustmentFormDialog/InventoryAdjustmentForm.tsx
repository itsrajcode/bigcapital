// @ts-nocheck
import React, { useEffect } from 'react';
import intl from 'react-intl-universal';
import moment from 'moment';
import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import { omit, get } from 'lodash';

import '@/style/pages/Items/ItemAdjustmentDialog.scss';

import { AppToaster } from '@/components';
import { CreateInventoryAdjustmentFormSchema } from './InventoryAdjustmentForm.schema';

import InventoryAdjustmentFormContent from './InventoryAdjustmentFormContent';
import { useInventoryAdjContext } from './InventoryAdjustmentFormProvider';

import withDialogActions from '@/containers/Dialog/withDialogActions';
import { compose } from '@/utils';

const defaultInitialValues = {
  date: moment(new Date()).format('YYYY-MM-DD'),
  type: 'decrement',
  adjustment_account_id: '',
  item_id: '',
  reason: '',
  cost: '',
  quantity: '',
  reference_no: '',
  quantity_on_hand: '',
  description: '',
  publish: '',
  branch_id: '',
  warehouse_id: '',
};

/**
 * Inventory adjustment form.
 */
function InventoryAdjustmentForm({
  // #withDialogActions
  closeDialog,
}) {
  const { dialogName, item, itemId, submitPayload, createInventoryAdjMutate } =
    useInventoryAdjContext();

  // Initial form values.
  const initialValues = {
    ...defaultInitialValues,
    item_id: itemId && itemId !== 'undefined' ? itemId : '',
    quantity_on_hand: get(item, 'quantity_on_hand', 0),
  };

  // Handles the form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    // Check if an item is selected - if not, show an error
    if (!values.item_id || values.item_id === 'undefined') {
      AppToaster.show({
        message: intl.get('please_select_an_item_for_adjustment'),
        intent: Intent.DANGER,
      });
      setSubmitting(false);
      return;
    }

    const form = {
      ...omit(values, ['quantity_on_hand', 'new_quantity', 'action']),
      date: values.date,
      type: values.type,
      adjustment_account_id: values.adjustment_account_id,
      reason: values.reason,
      reference_no: values.reference_no || '',
      item_id: parseInt(values.item_id, 10), // Ensure it's a number
      quantity: parseInt(values.quantity, 10), // Ensure it's a number
      cost: values.type === 'increment' ? parseFloat(values.cost) : undefined,
      description: values.reason, // Using reason as description
      publish: submitPayload.publish,
      warehouse_id: values.warehouse_id || undefined,
      branch_id: values.branch_id || undefined,
    };

    // Log the payload for debugging
    console.log('Inventory Adjustment Payload:', form);

    setSubmitting(true);
    createInventoryAdjMutate(form)
      .then((response) => {
        // Log the response
        console.log('Inventory Adjustment Response:', response);
        
        closeDialog(dialogName);

        AppToaster.show({
          message: intl.get(
            'the_adjustment_transaction_has_been_created_successfully',
          ),
          intent: Intent.SUCCESS,
        });
      })
      .catch((error) => {
        console.error('Inventory Adjustment Error:', error);
        
        AppToaster.show({
          message: error.message || intl.get('something_went_wrong'),
          intent: Intent.DANGER,
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      validationSchema={CreateInventoryAdjustmentFormSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      enableReinitialize={true}
    >
      <InventoryAdjustmentFormContent />
    </Formik>
  );
}

export default compose(withDialogActions)(InventoryAdjustmentForm);
