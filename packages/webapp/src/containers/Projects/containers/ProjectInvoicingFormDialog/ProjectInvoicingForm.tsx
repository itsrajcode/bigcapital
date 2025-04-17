// @ts-nocheck
import React from 'react';
import moment from 'moment';
import intl from 'react-intl-universal';
import { Formik } from 'formik';
import { Intent } from '@blueprintjs/core';
import { AppToaster } from '@/components';
import ProjectInvoicingFormContent from './ProjectInvoicingFormContent';
import { CreateProjectInvoicingFormSchema } from './ProjectInvoicingForm.schema';
import { useProjectInvoicingFormContext } from './ProjectInvoicingFormProvider';
import useApiRequest from '@/hooks/useRequest';

import withDialogActions from '@/containers/Dialog/withDialogActions';

import { compose } from '@/utils';

const defaultInitialValues = {
  date: moment().format('YYYY-MM-DD'),
  time: false,
  unbilled: false,
  bills: false,
};

/**
 * project invoicing form.
 * @returns
 */
function ProjectInvoicingForm({
  // #withDialogActions
  closeDialog,
}) {
  const { project, dialogName } = useProjectInvoicingFormContext();
  const apiRequest = useApiRequest();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Initial form values
  const initialValues = {
    ...defaultInitialValues,
  };

  // Handle closing the dialog
  const handleCloseDialog = React.useCallback(() => {
    if (dialogName) {
      closeDialog(dialogName);
    } else {
      closeDialog();
    }
  }, [closeDialog, dialogName]);

  // Handles the form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    // Set local state to track submission
    setIsSubmitting(true);
    
    // Check if project exists
    if (!project || !project.id) {
      console.error('Project data is missing:', project);
      setSubmitting(false);
      setIsSubmitting(false);
      AppToaster.show({
        message: intl.get('project_invoicing.dialog.error_project_missing'),
        intent: Intent.DANGER,
      });
      return;
    }

    // Format the date to YYYY-MM-DD
    let formattedDate;
    try {
      // First try to parse as moment object in case it's already a moment instance
      if (moment.isMoment(values.date)) {
        formattedDate = values.date.format('YYYY-MM-DD');
      } 
      // Then try to parse as Date object
      else if (values.date instanceof Date) {
        formattedDate = moment(values.date).format('YYYY-MM-DD');
      }
      // Finally try to parse as string
      else {
        formattedDate = moment(values.date).format('YYYY-MM-DD');
      }

      // Validate the formatted date
      if (!moment(formattedDate, 'YYYY-MM-DD', true).isValid()) {
        throw new Error('Invalid date format');
      }
    } catch (error) {
      console.error('Date parsing error:', error);
      setSubmitting(false);
      setIsSubmitting(false);
      setErrors({ date: intl.get('project_invoicing.dialog.error_invalid_date') });
      return;
    }

    const formData = {
      date: formattedDate,
      projectId: project.id,
      billableEntries: {
        time: values.time,
        unbilled: values.unbilled,
        bills: values.bills
      }
    };

    console.log('Submitting form data:', formData);

    // Handle request response success.
    const onSuccess = (response) => {
      console.log('API response:', response);
      setSubmitting(false);
      setIsSubmitting(false);
      
      // First show the success toast
      AppToaster.show({
        message: intl.get('project_invoicing.dialog.success_message'),
        intent: Intent.SUCCESS,
        timeout: 3000,
      });
      
      // Close dialog immediately - toast will remain visible
      handleCloseDialog();
    };

    // Handle request response errors.
    const onError = (error) => {
      console.error('API error:', error);
      setSubmitting(false);
      setIsSubmitting(false);
      
      if (error.response?.data?.errors) {
        const formattedErrors = {};
        error.response.data.errors.forEach((err) => {
          formattedErrors[err.param] = err.msg;
        });
        setErrors(formattedErrors);
      } else {
        AppToaster.show({
          message: intl.get('project_invoicing.dialog.error_generic'),
          intent: Intent.DANGER,
          timeout: 5000,
        });
      }
    };

    // Submit the form data
    apiRequest
      .post(`projects/${project.id}/invoice`, formData)
      .then(onSuccess)
      .catch(onError)
      .finally(() => {
        // Ensure submission state is reset even if there's an unhandled error
        setSubmitting(false);
        setIsSubmitting(false);
      });
  };

  return (
    <Formik
      validationSchema={CreateProjectInvoicingFormSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      component={(props) => <ProjectInvoicingFormContent {...props} isSubmitting={isSubmitting} />}
    />
  );
}

export default compose(withDialogActions)(ProjectInvoicingForm);
