// @ts-nocheck
import React from 'react';
import { Menu } from '@blueprintjs/core';

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
          <SidebarMenuItemComposerWithDashboard key={index} index={index} item={item} />
        ))}
      </Menu>
    </div>
  );
}
