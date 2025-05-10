import React from 'react';
import { css } from '@emotion/css';
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

interface BlackMinimalLine {
  item?: string;
  description?: string;
  quantity?: string;
  rate?: string;
  total?: string;
}

interface BlackMinimalTax {
  label: string;
  amount: string;
}

export interface BlackMinimalTemplateProps {
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
  lines?: Array<BlackMinimalLine>;
  taxes?: Array<BlackMinimalTax>;
}

export const BlackMinimalTemplate: React.FC<BlackMinimalTemplateProps> = ({
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
  billedToLabel = 'To',
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
      background-color: white;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    `,
    // Header Section
    headerSection: css`
      display: flex;
      flex-wrap: wrap;
    `,
    headerLeft: css`
      width: 50%;
      padding: 32px;
    `,
    headerRight: css`
      width: 50%;
      padding: 32px;
      background-color: ${secondaryColor};
    `,
    invoiceTitle: css`
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 16px;
    `,
    detailsContainer: css`
      display: flex;
      flex-direction: column;
      gap: 4px;
    `,
    detailsRow: css`
      display: flex;
    `,
    detailsLabel: css`
      font-weight: bold;
      margin-right: 8px;
    `,
    // Address Sections
    addressSection: css`
      margin-bottom: 24px;
    `,
    addressTitle: css`
      font-weight: bold;
      margin-bottom: 8px;
    `,
    addressContent: css`
      line-height: 1.5;
    `,
    // Table Header
    tableHeader: css`
      display: flex;
      background-color: ${primaryColor};
      color: white;
    `,
    tableHeaderItemCol: css`
      width: 50%;
      padding: 16px;
    `,
    tableHeaderCol: css`
      width: 16.666%;
      padding: 16px;
      text-align: center;
      
      &:last-child {
        text-align: right;
      }
    `,
    // Table Rows
    tableRow: css`
      display: flex;
      border-bottom: 1px solid #e5e7eb;
      
      &:hover {
        background-color: #f9fafb;
      }
    `,
    tableItemCol: css`
      width: 50%;
      padding: 16px;
    `,
    tableCol: css`
      width: 16.666%;
      padding: 16px;
      text-align: center;
      
      &:last-child {
        text-align: right;
      }
    `,
    itemTitle: css`
      font-weight: bold;
    `,
    itemDescription: css`
      color: #6b7280;
      font-size: 0.875rem;
    `,
    // Summary Section
    summaryContainer: css`
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      border-bottom: 1px solid #e5e7eb;
    `,
    summaryContent: css`
      width: 33.333%;
    `,
    summaryHeaderRow: css`
      display: flex;
      justify-content: space-between;
      background-color: ${primaryColor};
      color: white;
      padding: 16px;
    `,
    summaryRow: css`
      display: flex;
      justify-content: space-between;
      background-color: ${secondaryColor};
      padding: 16px;
      border-bottom: 1px solid #e5e7eb;
      
      &:last-child {
        border-bottom: none;
      }
    `,
    summaryLabel: css`
      &.bold {
        font-weight: bold;
      }
    `,
    summaryAmount: css`
      &.bold {
        font-weight: bold;
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
          {/* Invoice Title and Details */}
          <div className={styles.headerLeft}>
            <div className={styles.invoiceTitle}>INVOICE</div>
            <div className={styles.detailsContainer}>
              {showInvoiceNumber && (
                <div className={styles.detailsRow}>
                  <span className={styles.detailsLabel}>{invoiceNumberLabel} :</span>
                  <span>{invoiceNumber}</span>
                </div>
              )}
              {showDateIssue && (
                <div className={styles.detailsRow}>
                  <span className={styles.detailsLabel}>{dateIssueLabel} :</span>
                  <span>{dateIssue}</span>
                </div>
              )}
              {showDueDate && (
                <div className={styles.detailsRow}>
                  <span className={styles.detailsLabel}>{dueDateLabel} :</span>
                  <span>{dueDate}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Billing Addresses */}
          <div className={styles.headerRight}>
            {showCustomerAddress && (
              <div className={styles.addressSection}>
                <div className={styles.addressTitle}>{billedToLabel}</div>
                <div 
                  className={styles.addressContent}
                  dangerouslySetInnerHTML={{ __html: customerAddress.replace(/,/g, '') }}
                />
              </div>
            )}
            
            {showCompanyAddress && (
              <div className={styles.addressSection}>
                <div className={styles.addressTitle}>From</div>
                <div 
                  className={styles.addressContent}
                  dangerouslySetInnerHTML={{ __html: companyAddress.replace(/,/g, '') }}
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Table Header */}
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderItemCol}>{lineItemLabel}</div>
          <div className={styles.tableHeaderCol}>{lineQuantityLabel}</div>
          <div className={styles.tableHeaderCol}>{lineRateLabel}</div>
          <div className={styles.tableHeaderCol}>{lineTotalLabel}</div>
        </div>
        
        {/* Table Items */}
        {lines.map((line, index) => (
          <div key={index} className={styles.tableRow}>
            <div className={styles.tableItemCol}>
              <div className={styles.itemTitle}>{line.item}</div>
              <div className={styles.itemDescription}>{line.description}</div>
            </div>
            <div className={styles.tableCol}>{line.quantity}</div>
            <div className={styles.tableCol}>{line.rate}</div>
            <div className={styles.tableCol}>{line.total}</div>
          </div>
        ))}
        
        {/* Summary Section */}
        <div className={styles.summaryContainer}>
          <div className={styles.summaryContent}>
            {showSubtotal && (
              <div className={styles.summaryHeaderRow}>
                <span>{subtotalLabel}</span>
                <span>{subtotal}</span>
              </div>
            )}
            
            {showDiscount && (
              <div className={styles.summaryRow}>
                <span>{discountLabel}</span>
                <span>{discount}</span>
              </div>
            )}
            
            {showTaxes && taxes.map((tax, index) => (
              <div key={index} className={styles.summaryRow}>
                <span>{tax.label}</span>
                <span>{tax.amount}</span>
              </div>
            ))}
            
            {showTotal && (
              <div className={styles.summaryRow}>
                <span>{totalLabel}</span>
                <span>{total}</span>
              </div>
            )}
            
            {showPaymentMade && (
              <div className={styles.summaryRow}>
                <span>{paymentMadeLabel}</span>
                <span>{paymentMade}</span>
              </div>
            )}
            
            {showBalanceDue && (
              <div className={styles.summaryRow}>
                <span className={`${styles.summaryLabel} bold`}>{balanceDueLabel}</span>
                <span className={`${styles.summaryAmount} bold`}>{balanceDue}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </PaperTemplate>
  );
}; 