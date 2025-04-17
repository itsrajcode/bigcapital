// @ts-nocheck
import React from 'react';
import { useFormikContext } from 'formik';
import { Intent, Button, Classes } from '@blueprintjs/core';
import { FormattedMessage as T } from '@/components';
import { useProjectInvoicingFormContext } from './ProjectInvoicingFormProvider';
import withDialogActions from '@/containers/Dialog/withDialogActions';
import { compose } from '@/utils';

/**
 * Project invoicing from floating actions
 * @returns
 */
function ProjectInvoicingFormFloatingActions({
  // #withDialogActions
  closeDialog,
  // isSubmitting from parent component
  isSubmitting: externalIsSubmitting,
}) {
  // Formik context.
  const { isSubmitting: formikIsSubmitting } = useFormikContext();

  // Use either the external isSubmitting prop or the Formik isSubmitting state
  const isLoading = externalIsSubmitting || formikIsSubmitting;

  // project invoicing form dialog context.
  const { dialogName } = useProjectInvoicingFormContext();

  // Handle close button click.
  const handleCancelBtnClick = React.useCallback(() => {
    // Only allow closing if not submitting
    if (!isLoading) {
      if (dialogName) {
        closeDialog(dialogName);
      } else {
        closeDialog();
      }
    }
  }, [closeDialog, dialogName, isLoading]);

  return (
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button 
          onClick={handleCancelBtnClick} 
          style={{ minWidth: '85px' }}
          disabled={isLoading}
        >
          <T id={'cancel'} />
        </Button>
        <Button
          intent={Intent.PRIMARY}
          loading={isLoading}
          style={{ minWidth: '75px' }}
          type="submit"
          disabled={isLoading}
        >
          <T id={'project_invoicing.label.add'} />
        </Button>
      </div>
    </div>
  );
}

export default compose(withDialogActions)(ProjectInvoicingFormFloatingActions);
