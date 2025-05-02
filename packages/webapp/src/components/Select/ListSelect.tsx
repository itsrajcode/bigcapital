// @ts-nocheck
import React, { useState, useMemo, useEffect } from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { FormattedMessage as T } from '../FormattedMessage';
import classNames from 'classnames';
import { CLASSES } from '@/constants/classes';
import withDialogActions from '@/containers/Dialog/withDialogActions';
import { compose } from '@/utils';

export function ListSelect({
  buttonProps,
  defaultText,
  noResultsText = <T id="no_results" />,
  isLoading = false,
  textProp,
  labelProp,

  selectedItem,
  selectedItemProp = 'id',

  initialSelectedItem,
  onItemSelect,
  disabled = false,
  createNewItemFromQuery,
  createNewItemRenderer: providedCreateNewItemRenderer,
  onCreateItemSelect,
  openDialog,
  ...selectProps
}) {
  const selectedItemObj = useMemo(
    () => selectProps.items.find((i) => i[selectedItemProp] === selectedItem),
    [selectProps.items, selectedItemProp, selectedItem],
  );

  const selectedInitialItem = useMemo(
    () =>
      selectProps.items.find(
        (i) => i[selectedItemProp] === initialSelectedItem,
      ),
    [initialSelectedItem],
  );

  const [currentItem, setCurrentItem] = useState(
    (initialSelectedItem && selectedInitialItem) || null,
  );

  useEffect(() => {
    if (selectedItemObj) {
      setCurrentItem(selectedItemObj);
    }
  }, [selectedItemObj, setCurrentItem]);

  const noResults = isLoading ? (
    'loading'
  ) : (
    <MenuItem disabled={true} text={noResultsText} />
  );

  const itemRenderer = (item, { handleClick, modifiers, query }) => {
    return (
      <MenuItem
        text={item[textProp]}
        key={item[selectedItemProp]}
        label={item[labelProp]}
        onClick={handleClick}
      />
    );
  };

  const handleItemSelect = (_item) => {
    setCurrentItem(_item);
    onItemSelect && onItemSelect(_item);
  };

  // Filters accounts types items.
  const filterItems = (query, item, _index, exactMatch) => {
    const normalizedTitle = item[textProp].toLowerCase();
    const normalizedQuery = query.toLowerCase();

    if (exactMatch) {
      return normalizedTitle === normalizedQuery;
    } else {
      return normalizedTitle.indexOf(normalizedQuery) >= 0;
    }
  };

  const handleCreateNewItem = (query) => {
    console.log('hyii ia m working', query);
    if (openDialog) {
      openDialog('item-category-form', { initialName: query });
    }
    onCreateItemSelect && onCreateItemSelect(query);
  };

  // Custom create new item renderer that logs when clicked
  const createNewItemRenderer = (query, active, handleClick) => {
    if (!providedCreateNewItemRenderer) return undefined;

    const wrappedHandleClick = (e) => {
      console.log(openDialog);
      if (openDialog) {
        console.log('hyii ia m working', query);
        openDialog('item-category-form', { initialName: query });
      }
      handleClick(e);
    };
    
    return providedCreateNewItemRenderer(query, active, wrappedHandleClick);
  };

  return (
    <Select
      itemRenderer={selectProps.itemRenderer || itemRenderer}
      onItemSelect={handleItemSelect}
      itemPredicate={selectProps.itemPredicate || filterItems}
      createNewItemFromQuery={createNewItemFromQuery}
      createNewItemRenderer={createNewItemRenderer}
      onCreateNewItem={handleCreateNewItem}
      {...selectProps}
      noResults={noResults}
      disabled={disabled}
      className={classNames(
        CLASSES.FORM_GROUP_LIST_SELECT,
        selectProps.className,
      )}
    >
      <Button
        text={currentItem ? currentItem[textProp] : defaultText}
        loading={isLoading}
        disabled={disabled}
        {...buttonProps}
        fill={true}
      />
    </Select>
  );
}

