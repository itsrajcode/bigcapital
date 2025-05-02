// @ts-nocheck
import React, { useCallback } from 'react';
import { FormattedMessage as T } from '@/components';
import { ListSelect } from '@/components';
import { MenuItem } from '@blueprintjs/core';
import { saveInvoke } from '@/utils';
import classNames from 'classnames';
import { CLASSES } from '@/constants/classes';
import intl from 'react-intl-universal';
import withDialogActions from '@/containers/Dialog/withDialogActions';
import { DialogsName } from '@/constants/dialogs';
import { compose } from '@/utils';

// Creates a new category from query
const createNewCategoryFromQuery = (name) => ({
  name,
  id: null,
});

// Create new category renderer
const createNewCategoryRenderer = (query, active, handleClick) => (
  <MenuItem
    icon="add"
    text={intl.get('list.create', { value: `"${query}"` })}
    active={active}
    shouldDismissPopover={false}
    onClick={handleClick}
  />
);

/**
 * Categories select list component.
 */
function CategoriesSelectListRoot({
  // #withDialogActions
  openDialog,

  // #ownProps
  categories,
  selecetedCategoryId,
  defaultSelectText = <T id={'select_category'} />,
  onCategorySelected,
  popoverFill = false,
  allowCreate = false,
  onCreateItemSelect,
  className,
  ...restProps
}) {
  // Filter Items Category
  const filterItemCategory = (query, item, _index, exactMatch) => {
    const normalizedTitle = item.name.toLowerCase();
    const normalizedQuery = query.toLowerCase();
    if (exactMatch) {
      return normalizedTitle === normalizedQuery;
    } else {
      return `${item.code} ${normalizedTitle}`.indexOf(normalizedQuery) >= 0;
    }
  };

  const handleItemCategorySelected = useCallback(
    (ItemCategory) => saveInvoke(onCategorySelected, ItemCategory),
    [onCategorySelected],
  );

  const categoryItem = useCallback(
    (item, { handleClick }) => (
      <MenuItem key={item.id} text={item.name} onClick={handleClick} />
    ),
    [],
  );

  // Handle create new item click
  const handleCreateItemClick = (newCategory) => {
    // Open the dialog with the new category name
    openDialog(DialogsName.ItemCategoryForm, {
      initialValues: { name: newCategory.name },
      onSuccess: (category) => {
        // After success, invoke the callback with the created category
        onCreateItemSelect && onCreateItemSelect(category);
      }
    });
  };

  return (
    <ListSelect
      items={categories}
      selectedItemProp={'id'}
      selectedItem={selecetedCategoryId}
      textProp={'name'}
      defaultText={defaultSelectText}
      onItemSelect={handleItemCategorySelected}
      itemPredicate={filterItemCategory}
      itemRenderer={categoryItem}
      createNewItemFromQuery={allowCreate ? createNewCategoryFromQuery : null}
      createNewItemRenderer={allowCreate ? createNewCategoryRenderer : null}
      onCreateItemSelect={allowCreate ? handleCreateItemClick : null}
      openDialog={openDialog}
      popoverProps={{ minimal: true, usePortal: !popoverFill }}
      className={classNames(
        'form-group--select-list',
        {
          [CLASSES.SELECT_LIST_FILL_POPOVER]: popoverFill,
        },
        className,
      )}
      {...restProps}
    />
  );
}

export const CategoriesSelectList = compose(
  withDialogActions
)(CategoriesSelectListRoot);
