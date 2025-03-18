// @ts-nocheck

import { useProject } from '@/containers/Projects/hooks';
import { useProjectPurchases } from '@/containers/Projects/hooks/projectPurchases';
import React from 'react';
import { useParams } from 'react-router-dom';


const ProjectPurchasesContext = React.createContext();

function ProjectPurchasesProvider({ ...props }) {
  const { id } = useParams();
  const projectId = parseInt(id, 10);

  // fetch project purchases
  const {
    data: { projectPurchases },
    isLoading: isProjectPurchasesLoading,
  } = useProjectPurchases(projectId, {
    enabled: !!projectId,
  });
  console.log(projectPurchases)
  // Handle fetch project detail
  const { data: project } = useProject(projectId, {
    enabled: !!projectId,
  });

  const provider = {
    projectId,
    project,
    projectPurchases,
    isProjectPurchasesLoading,
  };

  return <ProjectPurchasesContext.Provider value={provider} {...props} />;
}

const useProjectPurchasesContext = () => React.useContext(ProjectPurchasesContext);

export { ProjectPurchasesProvider, useProjectPurchasesContext }; 