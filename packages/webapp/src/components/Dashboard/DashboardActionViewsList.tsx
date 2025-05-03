// @ts-nocheck
import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import {
  Button,
  Classes,
  MenuItem,
  Menu,
  Popover,
  PopoverInteractionKind,
  Position,
  Divider,
} from '@blueprintjs/core';
import { FormattedMessage as T } from '@/components';
import { Icon } from '@/components';
import { DashboardViewsTabs } from './DashboardViewsTabs';

/**
 * Dashboard action views list.
 */
export function DashboardActionViewsList({
  resourceName,
  allMenuItem,
  allMenuItemText,
  views,
  onChange,
  currentViewSlug,
}) {
  // Transform views to tabs (ensure each view has a 'name' and 'slug')
  const tabs = views.map((view) => ({
    name: view.name,
    slug: view.slug,
  }));

  return (
    <DashboardViewsTabs
      resourceName={resourceName}
      tabs={tabs}
      currentViewSlug={currentViewSlug}
      onChange={onChange}
      allTab={!!allMenuItem}
      defaultTabText={allMenuItemText || 'All'}
      newViewTab={false}
    />
  );
}
