import React from 'react';
import { css } from '@emotion/css';
import { Box } from '@/components';
import { Classes } from '@blueprintjs/core';
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
} from './PaperTemplate';

interface ModernCompactLine {
  item?: string;
  description?: string;
  quantity?: string;
  rate?: string;
  total?: string;
}

interface ModernCompactTax {
  label: string;
  amount: string;
}

export interface ModernCompactTemplateProps {
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
  lines?: Array<ModernCompactLine>;
  taxes?: Array<ModernCompactTax>;
}

export const ModernCompactTemplate: React.FC<ModernCompactTemplateProps> = ({
  primaryColor = '#4f46e5',
  secondaryColor = '#4f46e5',
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
  billedToLabel = 'Bill to',
  lineItemLabel = 'Item Description',
  lineQuantityLabel = 'Quantity',
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
  termsConditionsLabel = 'Terms & Conditions',
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
      font-family: 'Arial', sans-serif;
      color: #333;
      background-color: white;
      width: 100%;
      padding: 32px;
    `,
    // Header Section
    headerSection: css`
      display: flex;
      margin-bottom: 64px;
    `,
    headerThird: css`
      width: 33.333%;
    `,
    invoiceTitle: css`
      font-size: 3rem;
      font-weight: bold;
      margin-top: 24px;
    `,
    logoContainer: css`
      background-color: #d1d5db;
      height: 128px;
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    logoText: css`
      font-size: 2.25rem;
      font-weight: bold;
    `,
    detailsSection: css`
      width: 33.333%;
    `,
    detailsHeader: css`
      background-color: ${primaryColor};
      color: white;
      padding: 8px 16px;
      margin-bottom: 16px;
    `,
    detailsHeaderText: css`
      font-weight: 600;
    `,
    detailsContent: css`
      padding-left: 16px;
    `,
    detailsRow: css`
      display: flex;
      margin-bottom: 4px;
    `,
    detailsLabel: css`
      font-weight: 600;
      width: 128px;
    `,
    // Billing Section
    billingSection: css`
      margin-bottom: 32px;
      display: flex;
      justify-content: center;
      border: 2px solid #e5e7eb;
    `,
    billingContent: css`
      text-align: center;
      width: 50%;
      padding: 16px 0;
    `,
    billingTitle: css`
      font-weight: 600;
      margin-bottom: 8px;
    `,
    // Table Section
    tableContainer: css`
      margin-bottom: 32px;
    `,
    table: css`
      width: 100%;
      border-collapse: collapse;
    `,
    tableHeader: css`
      background-color: ${primaryColor};
      color: white;
    `,
    tableHeaderCell: css`
      padding: 12px 16px;
      text-align: left;
      
      &:nth-child(2) {
        text-align: center;
      }
      &:nth-child(3) {
        text-align: center;
      }
      &:nth-child(4) {
        text-align: right;
      }
    `,
    tableRow: css`
      border-bottom: 1px solid #e5e7eb;
    `,
    tableCell: css`
      padding: 16px;
      
      &:nth-child(2) {
        text-align: center;
      }
      &:nth-child(3) {
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
      font-size: 0.875rem;
      color: #6b7280;
    `,
    // Summary Section
    summarySection: css`
      display: flex;
      justify-content: flex-end;
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
      border-bottom: 1px solid #e5e7eb;
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
        <div className={styles.headerSection}>
          <div className={styles.headerThird}>
            <div className={styles.invoiceTitle}>INVOICE</div>
          </div>
          
          <div className={styles.headerThird}>
            {showCompanyLogo && companyLogoUri ? (
              <div className={styles.logoContainer}>
                <img src={companyLogoUri} alt={companyName} />
              </div>
            ) : (
              <div className={styles.logoContainer}>
                <div className={styles.logoText}>LOGO</div>
              </div>
            )}
          </div>
          
          <div className={styles.detailsSection}>
            <div className={styles.detailsHeader}>
              <p className={styles.detailsHeaderText}>Invoice Details</p>
            </div>
            <div className={styles.detailsContent}>
              {showInvoiceNumber && (
                <div className={styles.detailsRow}>
                  <div className={styles.detailsLabel}>{invoiceNumberLabel}:</div>
                  <div>{invoiceNumber}</div>
                </div>
              )}
              {showDateIssue && (
                <div className={styles.detailsRow}>
                  <div className={styles.detailsLabel}>{dateIssueLabel}:</div>
                  <div>{dateIssue}</div>
                </div>
              )}
              {showDueDate && (
                <div className={styles.detailsRow}>
                  <div className={styles.detailsLabel}>{dueDateLabel}:</div>
                  <div>{dueDate}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Billing Section */}
        {showCustomerAddress && (
          <div className={styles.billingSection}>
            <div className={styles.billingContent}>
              <div className={styles.billingTitle}>{billedToLabel}</div>
              <div 
                dangerouslySetInnerHTML={{ __html: customerAddress.replace(/,/g, '') }}
              />
            </div>
          </div>
        )}

        {/* Table Section */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
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
        </div>

        {/* Summary Section */}
        <div className={styles.summarySection}>
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