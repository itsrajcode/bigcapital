// @ts-nocheck
import React from 'react';
import { ItemCategoryProvider } from './ItemCategoryProvider';
import ItemCategoryForm from './ItemCategoryForm';

import '@/style/pages/ItemCategory/ItemCategoryDialog.scss';

/**
 * Item Category form dialog content.
 */
export default function ItemCategoryFormDialogContent({
  // #ownProp
  itemCategoryId,
  dialogName,
  // Add payload to receive initialValues
  payload,
}) {
  // Extract initialValues from payload
  const initialValues = payload?.initialValues;

  return (
    <ItemCategoryProvider
      itemCategoryId={itemCategoryId}
      dialogName={dialogName}
      // Pass initialValues to provider
      initialValues={initialValues}
    >
      <ItemCategoryForm />
    </ItemCategoryProvider>
  );
}
