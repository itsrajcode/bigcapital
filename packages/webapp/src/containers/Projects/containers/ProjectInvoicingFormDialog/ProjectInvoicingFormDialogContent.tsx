// @ts-nocheck
import React from 'react';

import { ProjectInvoicingFormProvider } from './ProjectInvoicingFormProvider';
import ProjectInvoicingForm from './ProjectInvoicingForm';

/**
 * Project Invoicing form dialog content.
 * @returns
 */
export default function ProjectInvoicingFormDialogContent({
  // #ownProps
  dialogName,
  project,
}) {
  return (
    <ProjectInvoicingFormProvider dialogName={dialogName} project={project}>
      <ProjectInvoicingForm />
    </ProjectInvoicingFormProvider>
  );
}
