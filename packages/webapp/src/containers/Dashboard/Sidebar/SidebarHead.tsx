// @ts-nocheck
import { Button, Popover, Menu, Position } from '@blueprintjs/core';

import { Icon } from '@/components';

import withCurrentOrganization from '@/containers/Organization/withCurrentOrganization';
import { useAuthenticatedAccount } from '@/hooks/query';
import { compose, firstLettersArgs } from '@/utils';

// Popover modifiers.
const POPOVER_MODIFIERS = {
  offset: { offset: '28, 8' },
};

/**
 * Sideabr head.
 */
function SidebarHeadJSX({
  // #withCurrentOrganization
  organization,
}) {
  // Retrieve authenticated user information.
  const { data: user } = useAuthenticatedAccount();
  
  // Get the first letter of organization name for minimized sidebar
  const firstLetter = organization.name ? organization.name.charAt(0).toUpperCase() : '';

  return (
    <div className="sidebar__head">
      {/* Company initial for minimized sidebar */}
      <div className="sidebar__head-logo">
        <div className="org-initial">{firstLetter}</div>
      </div>
      
      <div className="sidebar__head-organization">
        <Button
          className="title"
          rightIcon={<Icon icon={'caret-down-16'} size={16} />}
          title={organization.name}
        >
          {organization.name}
        </Button>
      </div>
    </div>
  );
}

export const SidebarHead = compose(
  withCurrentOrganization(({ organization }) => ({ organization })),
)(SidebarHeadJSX);
