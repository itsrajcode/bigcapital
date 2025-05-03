// @ts-nocheck
import React from 'react';
import { Ability } from '@casl/ability';
import { createContextualCan } from '@casl/react';

import { useDashboardMetaBoot } from './DashboardBoot';

// Create a default ability instance that denies everything
const defaultAbility = new Ability([{ action: 'manage', subject: 'all', inverted: true }]);

export const AbilityContext = React.createContext(defaultAbility);
export const Can = createContextualCan(AbilityContext.Consumer);

/**
 * Dashboard ability provider.
 */
export function DashboardAbilityProvider({ children }) {
  const { meta, isLoading } = useDashboardMetaBoot();

  // Create ability instance only if we have valid meta data
  const ability = React.useMemo(() => {
    if (isLoading || !meta || !meta.abilities) {
      return defaultAbility;
    }
    return new Ability(meta.abilities);
  }, [meta, isLoading]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}
