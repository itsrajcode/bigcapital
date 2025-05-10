// @ts-nocheck
import React from 'react';
import { Field, FastField, ErrorMessage } from 'formik';
import { FormGroup, InputGroup } from '@blueprintjs/core';
import { useAutofocus } from '@/hooks';
import { Row, Col, MoneyInputGroup, FormattedMessage as T } from '@/components';
import { inputIntent, toSafeNumber } from '@/utils';
import { decrementQuantity, incrementQuantity } from './utils';

export default function IncrementAdjustmentFields() {
  const incrementFieldRef = useAutofocus();

  return (
    <Row>
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

      {/*------------ Sign -----------*/}
      <Col className={'col--sign'}>
        <span>+</span>
      </Col>

      {/*------------ Increment -----------*/}
      <Col className={'col--quantity'}>
        <Field name={'quantity'}>
          {({
            form: { values, setFieldValue },
            field,
            meta: { error, touched },
          }) => (
            <FormGroup
              label={<T id={'increment'} />}
              intent={inputIntent({ error, touched })}
              helperText={<ErrorMessage name="quantity" />}
              fill={true}
            >
              <MoneyInputGroup
                value={field.value || ''}
                allowDecimals={false}
                allowNegativeValue={false}
                inputRef={(ref) => (incrementFieldRef.current = ref)}
                onChange={(value) => {
                  setFieldValue('quantity', value);
                }}
                onBlurValue={(value) => {
                  const safeValue = toSafeNumber(value) || 0;
                  const safeQtyOnHand = toSafeNumber(values.quantity_on_hand) || 0;
                  setFieldValue(
                    'new_quantity',
                    incrementQuantity(
                      safeValue,
                      safeQtyOnHand,
                    ),
                  );
                }}
                intent={inputIntent({ error, touched })}
              />
            </FormGroup>
          )}
        </Field>
      </Col>

      {/*------------ Cost -----------*/}
      <Col className={'col--cost'}>
        <FastField name={'cost'}>
          {({
            form: { setFieldValue },
            field: { value },
            meta: { error, touched },
          }) => (
            <FormGroup
              label={<T id={'cost'} />}
              intent={inputIntent({ error, touched })}
              helperText={<ErrorMessage name="cost" />}
            >
              <MoneyInputGroup
                value={value || ''}
                onChange={(value) => {
                  setFieldValue('cost', value);
                }}
                intent={inputIntent({ error, touched })}
              />
            </FormGroup>
          )}
        </FastField>
      </Col>

      {/*------------ Sign -----------*/}
      <Col className={'col--sign'}>
        <span>=</span>
      </Col>

      {/*------------ New quantity -----------*/}
      <Col className={'col--quantity-on-hand'}>
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
                  if (safeValue >= safeQtyOnHand) {
                    setFieldValue(
                      'quantity',
                      safeValue - safeQtyOnHand
                    );
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
