// @ts-nocheck
import React from 'react';
import { DialogContent } from '@/components';

const ProjectInvoicingFormContext = React.createContext();

/**
 * Project invoicing form provider.
 * @returns
 */
function ProjectInvoicingFormProvider({
  // #ownProps
  dialogName,
  project,
  ...props
}) {
  // State provider.
  const provider = {
    dialogName,
    project,
  };

  return (
    <DialogContent isLoading={false}>
      <ProjectInvoicingFormContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useProjectInvoicingFormContext = () =>
  React.useContext(ProjectInvoicingFormContext);

export { ProjectInvoicingFormProvider, useProjectInvoicingFormContext };
