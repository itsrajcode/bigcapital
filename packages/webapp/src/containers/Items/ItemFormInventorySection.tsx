// @ts-nocheck
import React from 'react';
import {
  AccountsSelect,
  FFormGroup,
  FormattedMessage as T,
  Col,
  Row,
  MoneyInputGroup,
} from '@/components';
import { FastField, ErrorMessage, useFormikContext } from 'formik';
import { FormGroup, InputGroup, ControlGroup } from '@blueprintjs/core';
import { inputIntent } from '@/utils';

import withCurrentOrganization from '@/containers/Organization/withCurrentOrganization';
import { accountsFieldShouldUpdate } from './utils';
import { ACCOUNT_TYPE } from '@/constants/accountTypes';
import { useItemFormContext } from './ItemFormProvider';
import { compose } from '@/utils';

/**
 * Item form inventory sections.
 */
function ItemFormInventorySection({ organization: { base_currency } }) {
  const { accounts } = useItemFormContext();
  const { values } = useFormikContext();
  
  // Only display this section for inventory items
  if (values.type !== 'inventory') {
    return null;
  }

  return (
    <div className="page-form__section page-form__section--inventory">
      <h3>
        <T id={'inventory_information'} />
      </h3>

      <Row>
        <Col xs={6}>
          {/*------------- Inventory Account ------------- */}
          <FFormGroup
            label={<T id={'inventory_account'} />}
            name={'inventory_account_id'}
            items={accounts}
            fastField={true}
            shouldUpdate={accountsFieldShouldUpdate}
            inline={true}
          >
            <AccountsSelect
              name={'inventory_account_id'}
              items={accounts}
              placeholder={<T id={'select_account'} />}
              filterByTypes={[ACCOUNT_TYPE.INVENTORY]}
              fastField={true}
              shouldUpdate={accountsFieldShouldUpdate}
            />
          </FFormGroup>
        </Col>
        
        <Col xs={6}>
          {/*------------- Quantity on Hand ------------- */}
          <FastField name={'quantity_on_hand'}>
            {({ field, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'quantity_on_hand'} />}
                className={'form-group--quantity-on-hand'}
                inline={true}
                intent={inputIntent({ error, touched })}
                helperText={<ErrorMessage name="quantity_on_hand" />}
              >
                <InputGroup 
                  intent={inputIntent({ error, touched })}
                  {...field}
                  type="number"
                  min="0"
                  placeholder="0"
                  step="1"
                  className="quantity-input"
                />
              </FormGroup>
            )}
          </FastField>
        </Col>
      </Row>
    </div>
  );
}

export default compose(withCurrentOrganization())(ItemFormInventorySection);
