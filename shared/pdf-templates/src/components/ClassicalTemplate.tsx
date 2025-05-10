import React from 'react';
import { css } from '@emotion/css';

import { InvoiceCustomizeFormValues } from './types';
import {
  DefaultPdfTemplateTerms,
  DefaultPdfTemplateItemDescription,
  DefaultPdfTemplateStatement,
  DefaultPdfTemplateItemName,
  DefaultPdfTemplateAddressBilledTo,
  DefaultPdfTemplateAddressBilledFrom,
} from './_constants';
import {
  PaperTemplate,
  PaperTemplateProps,
} from './PaperTemplate';

interface ClassicalLine {
  item?: string;
  description?: string;
  quantity?: string;
  rate?: string;
  total?: string;
}

interface ClassicalTax {
  label: string;
  amount: string;
}

export interface ClassicalTemplateProps {
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
  lines?: Array<ClassicalLine>;
  taxes?: Array<ClassicalTax>;
}

export const ClassicalTemplate: React.FC<ClassicalTemplateProps> = ({
  primaryColor = '#374151',
  secondaryColor = '#f3f4f6',
  companyName = 'Bigcapital Technology, Inc.',
  showCompanyLogo = true,
  companyLogoUri = '',
  showInvoiceNumber = true,
  invoiceNumber = '346D3D40-0001',
  invoiceNumberLabel = 'Invoice Number',
  showDateIssue = true,
  dateIssue = 'September 3, 2024',
  dateIssueLabel = 'Date of Issue',
  showDueDate = true,
  dueDate = 'September 3, 2024',
  dueDateLabel = 'Due Date',
  showCustomerAddress = true,
  customerAddress = DefaultPdfTemplateAddressBilledTo,
  showCompanyAddress = true,
  companyAddress = DefaultPdfTemplateAddressBilledFrom,
  billedToLabel = 'Invoice to',
  lineItemLabel = 'Item Description',
  lineQuantityLabel = 'Qty',
  lineRateLabel = 'Price',
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
  subtotal = '40,000',
  discount = '0.00',
  paymentMade = '100.00',
  balanceDue = '$562.75',
  termsConditionsLabel = 'Terms & Conditions :',
  showTermsConditions = true,
  termsConditions = DefaultPdfTemplateTerms,
  statementLabel = 'Statement',
  showStatement = true,
  statement = DefaultPdfTemplateStatement,
  lines = [
    {
      item: 'Web development',
      description: 'Website development with content and SEO optimization',
      quantity: '5',
      rate: '4000',
      total: '$20,000',
    },
    {
      item: 'Web development',
      description: 'Website development with content and SEO optimization',
      quantity: '5',
      rate: '4000',
      total: '$20,000',
    },
  ],
  taxes = [
    { label: 'Sample Tax2 (7.00%)', amount: '21.74' },
    { label: 'Sample Tax1 (4.70%)', amount: '11.75' },
  ],
}) => {
  const styles = {
    invoiceContainer: css`
      width: 100%;
      min-height: 100%;
      font-family: Arial, sans-serif;
      color: #333;
      background-color: ${secondaryColor};
      padding: 32px;
    `,
    // Header Section
    header: css`
      text-align: center;
      margin-bottom: 40px;
    `,
    invoiceTitle: css`
      font-size: 2.25rem;
      font-weight: bold;
      margin-bottom: 40px;
    `,
    // Details Section
    detailsSection: css`
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
    `,
    detailsBlock: css`
      width: 50%;
      text-align: left;
    `,
    detailsTitle: css`
      font-weight: 600;
      margin-bottom: 16px;
    `,
    detailsRow: css`
      margin-bottom: 8px;
    `,
    detailsLabel: css`
      font-weight: 600;
      display: inline-block;
      width: 128px;
    `,
    detailsValue: css`
      padding-left: 16px;
    `,
    addressContent: css`
      line-height: 1.5;
    `,
    // Table Section
    itemTable: css`
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 32px;
    `,
    tableHeader: css`
      background-color: ${primaryColor};
      color: white;
    `,
    tableHeaderCell: css`
      padding: 12px 16px;
      text-align: left;
      
      &:nth-child(2), &:nth-child(3) {
        text-align: center;
      }
      
      &:nth-child(4) {
        text-align: right;
      }
    `,
    tableRow: css`
      border-bottom: 1px solid #d1d5db;
    `,
    tableCell: css`
      padding: 16px;
      
      &:nth-child(2), &:nth-child(3) {
        text-align: center;
      }
      
      &:nth-child(4) {
        text-align: right;
      }
    `,
    itemTitle: css`
      font-weight: 600;
    `,
    itemDescription: css`
      color: #6b7280;
    `,
    // Summary Section
    summaryContainer: css`
      display: flex;
      justify-content: center;
    `,
    summaryTable: css`
      width: 50%;
    `,
    summaryHeaderRow: css`
      background-color: ${primaryColor};
      color: white;
      padding: 8px 16px;
      display: flex;
      justify-content: space-between;
    `,
    summaryHeaderLabel: css`
      font-weight: 600;
    `,
    summaryRow: css`
      padding: 8px 16px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #d1d5db;
      background-color: white;
    `,
    summaryLabel: css`
      &.bold {
        font-weight: 600;
      }
    `,
    summaryAmount: css`
      &.bold {
        font-weight: 600;
      }
    `,
  };

  return (
    <PaperTemplate
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    >
      <div className={styles.invoiceContainer}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.invoiceTitle}>INVOICE</div>
          
          <div className={styles.detailsSection}>
            <div className={styles.detailsBlock}>
              <div className={styles.detailsTitle}>Invoice Details</div>
              {showInvoiceNumber && (
                <div className={styles.detailsRow}>
                  <span className={styles.detailsLabel}>{invoiceNumberLabel}:</span>
                  <span className={styles.detailsValue}>{invoiceNumber}</span>
                </div>
              )}
              {showDateIssue && (
                <div className={styles.detailsRow}>
                  <span className={styles.detailsLabel}>{dateIssueLabel}:</span>
                  <span className={styles.detailsValue}>{dateIssue}</span>
                </div>
              )}
              {showDueDate && (
                <div className={styles.detailsRow}>
                  <span className={styles.detailsLabel}>{dueDateLabel}:</span>
                  <span className={styles.detailsValue}>{dueDate}</span>
                </div>
              )}
            </div>
            
            {showCustomerAddress && (
              <div className={styles.detailsBlock}>
                <div className={styles.detailsTitle}>{billedToLabel}</div>
                <div 
                  className={styles.addressContent}
                  dangerouslySetInnerHTML={{ __html: customerAddress.replace(/,/g, '') }}
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Table Section */}
        <table className={styles.itemTable}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.tableHeaderCell}>{lineItemLabel}</th>
              <th className={styles.tableHeaderCell}>{lineQuantityLabel}</th>
              <th className={styles.tableHeaderCell}>{lineRateLabel}</th>
              <th className={styles.tableHeaderCell}>{lineTotalLabel}</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <div className={styles.itemTitle}>{line.item}</div>
                  <div className={styles.itemDescription}>{line.description}</div>
                </td>
                <td className={styles.tableCell}>{line.quantity}</td>
                <td className={styles.tableCell}>{line.rate}</td>
                <td className={styles.tableCell}>{line.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Summary Section */}
        <div className={styles.summaryContainer}>
          <div className={styles.summaryTable}>
            {showSubtotal && (
              <div className={styles.summaryHeaderRow}>
                <div className={styles.summaryHeaderLabel}>{subtotalLabel}</div>
                <div>{subtotal}</div>
              </div>
            )}
            {showDiscount && (
              <div className={styles.summaryRow}>
                <div className={styles.summaryLabel}>{discountLabel}</div>
                <div className={styles.summaryAmount}>{discount}</div>
              </div>
            )}
            {showTaxes && taxes.map((tax, index) => (
              <div className={styles.summaryRow} key={index}>
                <div className={styles.summaryLabel}>{tax.label}</div>
                <div className={styles.summaryAmount}>{tax.amount}</div>
              </div>
            ))}
            {showTotal && (
              <div className={styles.summaryRow}>
                <div className={`${styles.summaryLabel} bold`}>{totalLabel}</div>
                <div className={`${styles.summaryAmount} bold`}>{total}</div>
              </div>
            )}
            {showPaymentMade && (
              <div className={styles.summaryRow}>
                <div className={styles.summaryLabel}>{paymentMadeLabel}</div>
                <div className={styles.summaryAmount}>{paymentMade}</div>
              </div>
            )}
            {showBalanceDue && (
              <div className={styles.summaryRow}>
                <div className={`${styles.summaryLabel} bold`}>{balanceDueLabel}</div>
                <div className={`${styles.summaryAmount} bold`}>{balanceDue}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PaperTemplate>
  );
}; 