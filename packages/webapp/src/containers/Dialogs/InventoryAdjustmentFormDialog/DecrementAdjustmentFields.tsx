// @ts-nocheck
import React from 'react';
import { Field, ErrorMessage, FastField } from 'formik';
import { FormGroup, InputGroup } from '@blueprintjs/core';
import { inputIntent, toSafeNumber } from '@/utils';
import { Row, Col, MoneyInputGroup, FormattedMessage as T } from '@/components';
import { useAutofocus } from '@/hooks';
import { decrementQuantity } from './utils';

/**
 * Decrement adjustment fields.
 */
function DecrementAdjustmentFields() {
  const decrementFieldRef = useAutofocus();

  return (
    <Row className={'row--decrement-fields'}>
      {/*------------ Quantity on hand  -----------*/}
      <Col className={'col--quantity-on-hand'}>
        <Field name={'quantity_on_hand'}>
          {({ field, form, meta: { error, touched } }) => (
            <FormGroup
              label={<T id={'qty_on_hand'} />}
              intent={inputIntent({ error, touched })}
              helperText={<ErrorMessage name="quantity_on_hand" />}
            >
              <MoneyInputGroup
                disabled={true}
                value={field.value || '0'}
                allowDecimals={false}
                allowNegativeValue={false}
                intent={inputIntent({ error, touched })}
                onChange={(value) => {
                  console.log('Quantity on hand changed:', value);
                  form.setFieldValue('quantity_on_hand', value);
                }}
              />
            </FormGroup>
          )}
        </Field>
      </Col>

      <Col className={'col--sign'}>
        <span>–</span>
      </Col>

      {/*------------ Decrement -----------*/}
      <Col className={'col--quantity'}>
        <Field name={'quantity'}>
          {({
            form: { values, setFieldValue },
            field,
            meta: { error, touched },
          }) => (
            <FormGroup
              label={<T id={'decrement'} />}
              intent={inputIntent({ error, touched })}
              helperText={<ErrorMessage name="quantity" />}
              fill={true}
            >
              <MoneyInputGroup
                value={field.value || ''}
                allowDecimals={false}
                allowNegativeValue={false}
                inputRef={(ref) => (decrementFieldRef.current = ref)}
                onChange={(value) => {
                  setFieldValue('quantity', value);
                }}
                onBlurValue={(value) => {
                  const safeValue = toSafeNumber(value) || 0;
                  const safeQtyOnHand = toSafeNumber(values.quantity_on_hand) || 0;
                  const newQty = safeQtyOnHand - safeValue;
                  
                  setFieldValue('new_quantity', newQty >= 0 ? newQty : 0);
                }}
                intent={inputIntent({ error, touched })}
              />
            </FormGroup>
          )}
        </Field>
      </Col>

      {/*------------ Sign -----------*/}
      <Col className={'col--sign'}>
        <span>=</span>
      </Col>

      {/*------------ New quantity -----------*/}
      <Col className={'col--quantity'}>
        <Field name={'new_quantity'}>
          {({
            form: { values, setFieldValue },
            field,
            meta: { error, touched },
          }) => (
            <FormGroup
              label={<T id={'new_quantity'} />}
              intent={inputIntent({ error, touched })}
              helperText={<ErrorMessage name="new_quantity" />}
            >
              <MoneyInputGroup
                value={field.value || '0'}
                allowDecimals={false}
                allowNegativeValue={false}
                onChange={(value) => {
                  setFieldValue('new_quantity', value);
                }}
                onBlurValue={(value) => {
                  const safeValue = toSafeNumber(value) || 0;
                  const safeQtyOnHand = toSafeNumber(values.quantity_on_hand) || 0;
                  
                  if (safeValue <= safeQtyOnHand) {
                    setFieldValue('quantity', safeQtyOnHand - safeValue);
                  }
                }}
                intent={inputIntent({ error, touched })}
              />
            </FormGroup>
          )}
        </Field>
      </Col>
    </Row>
  );
}

export default DecrementAdjustmentFields;
