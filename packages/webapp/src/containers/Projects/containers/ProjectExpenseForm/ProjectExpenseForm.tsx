// @ts-nocheck
import React from 'react';
import moment from 'moment';
import intl from 'react-intl-universal';
import { Formik } from 'formik';
import { Intent } from '@blueprintjs/core';
import { AppToaster } from '@/components';
import { CreateProjectExpenseFormSchema } from './ProjectExpenseForm.schema';
import ProjectExpenseFormContent from './ProjectExpenseFormContent';
import { useProjectExpenseFormContext } from './ProjectExpenseFormProvider';
import withDialogActions from '@/containers/Dialog/withDialogActions';
import { compose } from '@/utils';

const defaultInitialValues = {
  expenseName: '',
  estimatedExpense: '',
  expemseDate: moment(new Date()).format('YYYY-MM-DD'),
  expenseUnitPrice: '',
  expenseQuantity: 1,
  expenseCharge: '% markup',
  percentage: '',
  expenseTotal: '',
};

/**
 * Project expense form.
 * @returns
 */
function ProjectExpenseForm({
  //#withDialogActions
  closeDialog,
}) {
  // Get projectId from context
  const { dialogName, projectId, isNewMode,createProjectExpenseMutate } = useProjectExpenseFormContext();
  console.table({ dialogName, projectId, isNewMode })
  const initialValues = {
    ...defaultInitialValues,
  };

  // Handles the form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    const form = {
      ...values,
      project_id: projectId,
    };
    
    // Handle request response success.
    const onSuccess = (response) => {
      // Show success message
      AppToaster.show({
        message: intl.get(
          isNewMode
            ? 'project_expense.success_message'
            : 'project_expense.edit_success_message'
        ),
        intent: Intent.SUCCESS,
      });
      
      // Explicitly close dialog with a slight delay to ensure state updates properly
      setTimeout(() => {
        closeDialog(dialogName);
      }, 100);
    };

    // Handle request response errors.
    const onError = (error) => {
      setSubmitting(false);
      
      // Check if error exists and has response data
      const errors = error?.response?.data?.errors || {};
      setErrors(errors);
    };

    if (isNewMode) {
      createProjectExpenseMutate([projectId, form])
        .then(onSuccess)
        .catch(onError)
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      editProjectExpenseMutate([expenseId, form])
        .then(onSuccess)
        .catch(onError)
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  return (
    <Formik
      validationSchema={CreateProjectExpenseFormSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      component={ProjectExpenseFormContent}
    />
  );
}

export default compose(withDialogActions)(ProjectExpenseForm);
