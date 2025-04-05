// @ts-nocheck
import React from 'react';
import { Menu, MenuDivider } from '@blueprintjs/core';

import { MenuItem, MenuItemLabel, Icon } from '@/components';
import { ISidebarMenuItemType } from '@/containers/Dashboard/Sidebar/interfaces';
import { useIsSidebarMenuItemActive } from './hooks';
import withDashboard from '@/containers/Dashboard/withDashboard';
import { compose } from '@/utils';

/**
 * Sidebar menu item.
 * @returns {JSX.Element}
 */
function SidebarMenuItem({ item, index, sidebarExpended }) {
  // Determine whether the item is active.
  const isActive = useIsSidebarMenuItemActive(item);

  return (
    <MenuItem
      key={index}
      icon={item.icon && <Icon icon={item.icon} />}
      text={
        <span className="menu-item__text">
          {item.text}
        </span>
      }
      disabled={item.disabled}
      dropdownType={item.dropdownType || 'collapse'}
      caretIconSize={16}
      onClick={item.onClick}
      active={isActive}
      hasSubmenu={item.hasChildren}
      className={item.children ? 'has-submenu' : ''}
    />
  );
}

SidebarMenuItem.ItemTypes = [
  ISidebarMenuItemType.Link,
  ISidebarMenuItemType.Overlay,
  ISidebarMenuItemType.Dialog,
];

/**
 * Determines which sidebar menu item type should display.
 * @returns {JSX.Element}
 */
function SidebarMenuItemComposer({ item, index, sidebarExpended }) {
  // Link item type.
  return SidebarMenuItem.ItemTypes.indexOf(item.type) !== -1 ? (
    <SidebarMenuItem item={item} index={index} sidebarExpended={sidebarExpended} />
  ) : // Group item type.
  item.type === ISidebarMenuItemType.Group ? (
    <MenuItemLabel text={item.text} />
  ) : null;
}

const SidebarMenuItemComposerWithDashboard = compose(
  withDashboard(({ sidebarExpended }) => ({ sidebarExpended }))
)(SidebarMenuItemComposer);

/**
 * Sidebar menu.
 * @returns {JSX.Element}
 */
export function SidebarMenu({ menu }) {
  return (
    <div>
      <Menu className="sidebar-menu">
        {menu.map((item, index) => (
          <React.Fragment key={index}>
            <SidebarMenuItemComposerWithDashboard index={index} item={item} />
            {/* Add dividers after specific menu items */}
            {(item.text && item.text.props && item.text.props.id === 'sidebar.homepage') || 
             (item.text && item.text.props && item.text.props.id === 'sidebar.contacts') || 
             (item.text && item.text.props && item.text.props.id === 'sidebar.reports') ? (
              <MenuDivider className="menu-divider" />
            ) : null}
          </React.Fragment>
        ))}
      </Menu>
    </div>
  );
}
