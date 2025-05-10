// @ts-nocheck
import React, { useEffect } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import classNames from 'classnames';

import { useObserveSidebarExpendedBodyclass } from './hooks';
import { compose } from '@/utils';

/**
 * Sidebar container/
 * @returns {JSX.Element}
 */
function SidebarContainerJSX({
  // #ownProps
  children,
  sidebarExpended = true,
}) {
  const sidebarScrollerRef = React.useRef();

  useObserveSidebarExpendedBodyclass(sidebarExpended);

  useEffect(() => {
    if (!sidebarExpended && sidebarScrollerRef.current) {
      sidebarScrollerRef.current.scrollTo({
        top: 0,
        left: 0,
      });
    }
  }, [sidebarExpended]);

  const handleSidebarMouseLeave = () => {
    if (!sidebarExpended && sidebarScrollerRef.current) {
      sidebarScrollerRef.current.scrollTo({ top: 0, left: 0 });
    }
  };

  const scrollerElementRef = React.useCallback((ref) => {
    sidebarScrollerRef.current = ref;
  }, []);

  return (
    <div
      className={classNames("sidebar", {
        "sidebar--mini-sidebar": !sidebarExpended
      })}
      id="sidebar"
      onMouseLeave={handleSidebarMouseLeave}
    >
      <div className="sidebar__scroll-wrapper">
        <Scrollbar
          noDefaultStyles={true}
          scrollerProps={{ elementRef: scrollerElementRef }}
        >
          <div className="sidebar__inner">{children}</div>
        </Scrollbar>
      </div>
    </div>
  );
}

export const SidebarContainer = SidebarContainerJSX;
