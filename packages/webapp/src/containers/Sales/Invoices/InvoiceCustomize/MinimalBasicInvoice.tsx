import React from 'react';
import { css } from '@emotion/css';
import { Box, Group, Stack } from '@/components';
import { Classes, Text } from '@blueprintjs/core';
import { InvoiceCustomizeFormValues } from './types';
import {
  DefaultPdfTemplateTerms,
  DefaultPdfTemplateItemDescription,
  DefaultPdfTemplateStatement,
  DefaultPdfTemplateItemName,
  DefaultPdfTemplateAddressBilledTo,
  DefaultPdfTemplateAddressBilledFrom,
} from '@/constants/PdfTemplates';
import {
  PaperTemplate,
  PaperTemplateProps,
  PaperTemplateTotalBorder,
} from './PaperTemplate';

interface MinimalBasicLine {
  item?: string;
  description?: string;
  quantity?: string;
  rate?: string;
  total?: string;
}

interface MinimalBasicTax {
  label: string;
  amount: string;
}

export interface MinimalBasicTemplateProps {
  primaryColor?: string;
  secondaryColor?: string;
  companyName?: string;
  showCompanyLogo?: boolean;
  companyLogoUri?: string;
  showInvoiceNumber?: boolean;
  invoiceNumber?: string;
  invoiceNumberLabel?: string;
  showDateIssue?: boolean;
  dateIssue?: string;
  dateIssueLabel?: string;
  showDueDate?: boolean;
  dueDate?: string;
  dueDateLabel?: string;
  showCustomerAddress?: boolean;
  customerAddress?: string;
  showCompanyAddress?: boolean;
  companyAddress?: string;
  billedToLabel?: string;
  lineItemLabel?: string;
  lineQuantityLabel?: string;
  lineRateLabel?: string;
  lineTotalLabel?: string;
  totalLabel?: string;
  subtotalLabel?: string;
  discountLabel?: string;
  paymentMadeLabel?: string;
  balanceDueLabel?: string;
  showTotal?: boolean;
  showSubtotal?: boolean;
  showDiscount?: boolean;
  showTaxes?: boolean;
  showPaymentMade?: boolean;
  showDueAmount?: boolean;
  showBalanceDue?: boolean;
  total?: string;
  subtotal?: string;
  discount?: string;
  paymentMade?: string;
  balanceDue?: string;
  termsConditionsLabel?: string;
  showTermsConditions?: boolean;
  termsConditions?: string;
  statementLabel?: string;
  showStatement?: boolean;
  statement?: string;
  lines?: Array<MinimalBasicLine>;
  taxes?: Array<MinimalBasicTax>;
}

export const MinimalBasicTemplate: React.FC<MinimalBasicTemplateProps> = ({
  primaryColor = '#000000',
  secondaryColor = '#e1f3fa',
  companyName = 'Bigcapital Technology, Inc.',
  showCompanyLogo = true,
  companyLogoUri = '',
  showInvoiceNumber = true,
  invoiceNumber = '346D3D40-0001',
  invoiceNumberLabel = 'Invoice number',
  showDateIssue = true,
  dateIssue = 'September 3, 2024',
  dateIssueLabel = 'Date of issue',
  showDueDate = true,
  dueDate = 'September 3, 2024',
  dueDateLabel = 'Date due',
  showCustomerAddress = true,
  customerAddress = DefaultPdfTemplateAddressBilledTo,
  showCompanyAddress = true,
  companyAddress = DefaultPdfTemplateAddressBilledFrom,
  billedToLabel = 'Billed To',
  lineItemLabel = 'Item',
  lineQuantityLabel = 'Qty',
  lineRateLabel = 'Rate',
  lineTotalLabel = 'Total',
  totalLabel = 'Total',
  subtotalLabel = 'Subtotal',
  discountLabel = 'Discount',
  paymentMadeLabel = 'Payment Made',
  balanceDueLabel = 'Balance Due',
  showTotal = true,
  showSubtotal = true,
  showDiscount = true,
  showTaxes = true,
  showPaymentMade = true,
  showDueAmount = true,
  showBalanceDue = true,
  total = '$662.75',
  subtotal = '630.00',
  discount = '0.00',
  paymentMade = '100.00',
  balanceDue = '$562.75',
  termsConditionsLabel = 'Terms & Conditions',
  showTermsConditions = true,
  termsConditions = DefaultPdfTemplateTerms,
  statementLabel = 'Statement',
  showStatement = true,
  statement = DefaultPdfTemplateStatement,
  lines = [
    {
      item: DefaultPdfTemplateItemName,
      description: DefaultPdfTemplateItemDescription,
      rate: '1',
      quantity: '1000',
      total: '$1000.00',
    },
  ],
  taxes = [
    { label: 'Sample Tax1 (4.70%)', amount: '11.75' },
    { label: 'Sample Tax2 (7.00%)', amount: '21.74' },
  ],
}) => {
  const styles = {
    invoiceContainer: css`
      width: 100%;
      min-height: 100%;
      padding: 30px;
      font-family: "Outfit", sans-serif;
    `,
    invoiceHeader: css`
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    `,
    invoiceDetails: css`
      margin-bottom: 10px;
      display: flex;
    `,
    invoiceDetailsLabel: css`
      width: 120px;
      font-weight: 500;
    `,
    invoiceTitle: css`
      font-size: 28px;
      color: ${primaryColor};
      font-weight: 600;
      text-align: right;
    `,
    addressContainer: css`
      display: flex;
      margin-bottom: 30px;
    `,
    addressSection: css`
      width: 50%;
      padding: 15px;
      border: 1px solid #f2f2f2;
      border-radius: 5px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    `,
    addressTitle: css`
      font-weight: 600;
      margin-bottom: 5px;
    `,
    addressContent: css`
      line-height: 1.4;
      font-size: 14px;
    `,
    invoiceTable: css`
      width: 100%;
      max-width: 800px;
      border-collapse: collapse;
      border: 2px solid #f2f2f2;
      border-radius: 24px;
      overflow: hidden;
      margin: 0 auto 30px;
      
      th {
        background-color: ${secondaryColor};
        height: 50px;
        padding: 10px;
        text-align: left;
        font-size: 16px;
      }
      
      td {
        padding: 10px;
        border-bottom: 1px solid #f0f0f0;
        font-size: 14px;
      }
      
      tr:nth-child(even) {
        background-color: #f9f9f9;
      }
    `,
    itemDescription: css`
      font-weight: 600;
      margin-bottom: 2px;
      color: #1a1a1a;
    `,
    itemDetails: css`
      color: #666;
      font-size: 14px;
    `,
    summaryTable: css`
      width: 50%;
      margin-left: auto;
      margin-bottom: 10px;
      
      th {
        background-color: ${secondaryColor};
        padding: 10px;
        height: 70px;
        border-bottom: 1px solid #e0e0e0;
        font-size :20px
      }
      
      td {
        padding: 10px;
        height: 40px;
        border-bottom: 1px solid #e0e0e0;
        font-size : 14px;
      }
      
      td:first-child {
        width: 70%;
      }
      
      td:last-child {
        text-align: right;
      }
      
      .subtotal-row td {
        background-color: ${secondaryColor};
        font-weight: 600;
      }
      
      .total-row td,
      .balance-row td {
        font-weight: 600;
      }
    `,
    footerSection: css`
      display: flex;
      margin-top: 30px;
      border-top: 1px solid #e0e0e0;
      padding-top: 20px;
    `,
    termsSection: css`
      width: 50%;
      padding-right: 20px;
    `,
    statementSection: css`
      width: 50%;
      padding-right: 20px;
    `,
    termsTitle: css`
      font-weight: 600;
      margin-bottom: 5px;
    `,
    statementTitle: css`
      font-weight: 600;
      margin-bottom: 5px;
    `,
    termsContent: css`
      font-size: 13px;
      line-height: 1.4;
    `,
    statementContent: css`
      font-size: 13px;
      line-height: 1.4;
    `,
  };

  return (
    <PaperTemplate
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    >
      <div className={styles.invoiceContainer}>
        <div className={styles.invoiceHeader}>
          <div>
            {showInvoiceNumber && (
              <div className={styles.invoiceDetails}>
                <div className={styles.invoiceDetailsLabel}>{invoiceNumberLabel}</div>
                <div>{invoiceNumber}</div>
              </div>
            )}
            {showDateIssue && (
              <div className={styles.invoiceDetails}>
                <div className={styles.invoiceDetailsLabel}>{dateIssueLabel}</div>
                <div>{dateIssue}</div>
              </div>
            )}
            {showDueDate && (
              <div className={styles.invoiceDetails}>
                <div className={styles.invoiceDetailsLabel}>{dueDateLabel}</div>
                <div>{dueDate}</div>
              </div>
            )}
          </div>
          <div className={styles.invoiceTitle}>INVOICE</div>
        </div>

        {(showCustomerAddress || showCompanyAddress) && (
          <div className={styles.addressContainer}>
            {showCustomerAddress && (
              <div className={styles.addressSection}>
                <div className={styles.addressTitle}>{billedToLabel}</div>
                <div 
                  className={styles.addressContent}
                  dangerouslySetInnerHTML={{ __html: customerAddress }}
                />
              </div>
            )}
            {showCompanyAddress && (
              <div className={styles.addressSection}>
                <div className={styles.addressTitle}>From</div>
                <div 
                  className={styles.addressContent}
                  dangerouslySetInnerHTML={{ __html: companyAddress }}
                />
              </div>
            )}
          </div>
        )}

        <table className={styles.invoiceTable}>
          <thead>
            <tr>
              <th style={{ width: '60%' }}>{lineItemLabel}</th>
              <th>{lineQuantityLabel}</th>
              <th>{lineRateLabel}</th>
              <th>{lineTotalLabel}</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, index) => (
              <tr key={index}>
                <td>
                  <div className={styles.itemDescription}>{line.item}</div>
                  <div className={styles.itemDetails}>{line.description}</div>
                </td>
                <td>{line.quantity}</td>
                <td>{line.rate}</td>
                <td>{line.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className={styles.summaryTable}>
          {showSubtotal && (
            <tr className="subtotal-row">
              <th>{subtotalLabel}</th>
              <th>{subtotal}</th>
            </tr>
          )}
          {showDiscount && (
            <tr>
              <td>{discountLabel}</td>
              <td>{discount}</td>
            </tr>
          )}
          {showTaxes && taxes.map((tax, index) => (
            <tr key={index}>
              <td>{tax.label}</td>
              <td>{tax.amount}</td>
            </tr>
          ))}
          {showTotal && (
            <tr className="total-row">
              <td>{totalLabel}</td>
              <td>{total}</td>
            </tr>
          )}
          {showPaymentMade && (
            <tr>
              <td>{paymentMadeLabel}</td>
              <td>{paymentMade}</td>
            </tr>
          )}
          {showBalanceDue && (
            <tr className="balance-row">
              <td>{balanceDueLabel}</td>
              <td>{balanceDue}</td>
            </tr>
          )}
        </table>

        <div className={styles.footerSection}>
          {showTermsConditions && (
            <div className={styles.termsSection}>
              <div className={styles.termsTitle}>{termsConditionsLabel}</div>
              <div 
                className={styles.termsContent}
                dangerouslySetInnerHTML={{ __html: termsConditions }}
              />
            </div>
          )}
          {showStatement && (
            <div className={styles.statementSection}>
              <div className={styles.statementTitle}>{statementLabel}</div>
              <div 
                className={styles.statementContent}
                dangerouslySetInnerHTML={{ __html: statement }}
              />
            </div>
          )}
        </div>
      </div>
    </PaperTemplate>
  );
};