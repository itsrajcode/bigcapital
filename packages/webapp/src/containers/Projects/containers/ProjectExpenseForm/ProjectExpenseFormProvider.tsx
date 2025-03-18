// @ts-nocheck
import React from 'react';
import { DialogContent } from '@/components';
import { useCreateProjectExpense } from '../../hooks/expenseHook';

const ProjectExpenseFormContext = React.createContext();

/**
 * Project expense form provider.
 * @returns
 */
function ProjectExpenseFormProvider({
  //#OwnProps
  dialogName,
  expenseId,
  projectId,
  ...props
}) {
  // state provider.
  const { mutateAsync :createProjectExpenseMutate } = useCreateProjectExpense()
  console.table({ dialogName, expenseId, projectId })
  const provider = {
    dialogName,
    projectId,  // Include projectId in provider
    expenseId,
    isNewMode: !expenseId,
    createProjectExpenseMutate
  };

  return (
    <DialogContent>
      <ProjectExpenseFormContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useProjectExpenseFormContext = () =>
  React.useContext(ProjectExpenseFormContext);
export { ProjectExpenseFormProvider, useProjectExpenseFormContext };
