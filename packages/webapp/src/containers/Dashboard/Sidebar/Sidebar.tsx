// @ts-nocheck
import React from 'react';
import { Button } from '@blueprintjs/core';

import { SidebarContainer } from './SidebarContainer';
import { SidebarHead } from './SidebarHead';
import { SidebarMenu } from './SidebarMenu';
import { useMainSidebarMenu } from './hooks';
import { SidebarOverlayBinded } from '../SidebarOverlay';
import { Icon } from '@/components';

import '@/style/containers/Dashboard/Sidebar.scss';

/**
 * Dashboard sidebar.
 * @returns {JSX.Element}
 */
export function Sidebar() {
  const menu = useMainSidebarMenu();

  // Get sidebar expanded state from local storage or default to true
  const [sidebarExpanded, setSidebarExpanded] = React.useState(() => {
    const savedState = localStorage.getItem('sidebarExpanded');
    return savedState !== null ? savedState === 'true' : true;
  });

  // Toggle sidebar expanded state
  const toggleSidebar = () => {
    const newState = !sidebarExpanded;
    setSidebarExpanded(newState);
    localStorage.setItem('sidebarExpanded', newState);
    document.body.classList.toggle('has-mini-sidebar', !newState);
  };

  return (
    <SidebarContainer sidebarExpended={sidebarExpanded}>
      <SidebarHead />
      <div className="sidebar__menu">
        <SidebarMenu menu={menu} />
      </div>
      <SidebarOverlayBinded />
      <div className="sidebar__footer">
        <Button 
          minimal={true}
          className="sidebar__toggle-btn"
          onClick={toggleSidebar}
          title={sidebarExpanded ? "Minimize sidebar" : "Expand sidebar"}
          icon={<Icon icon={sidebarExpanded ? 'chevron-left-16' : 'chevron-right-16'} size={16} />}
        />
        <SidebarFooterVersion />
      </div>
    </SidebarContainer>
  );
}

/**
 * Sidebar footer version.
 * @returns {React.JSX}
 */
function SidebarFooterVersion() {
  const { REACT_APP_VERSION } = process.env;

  if (!REACT_APP_VERSION) {
    return null;
  }
  return <div className="sidebar__version">v{REACT_APP_VERSION}</div>;
}
