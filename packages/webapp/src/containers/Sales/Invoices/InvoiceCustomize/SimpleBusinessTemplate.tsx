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

interface SimpleBusinessLine {
  item?: string;
  description?: string;
  quantity?: string;
  rate?: string;
  total?: string;
}

interface SimpleBusinessTax {
  label: string;
  amount: string;
}

export interface SimpleBusinessTemplateProps {
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
  lines?: Array<SimpleBusinessLine>;
  taxes?: Array<SimpleBusinessTax>;
  balanceDueValue?: string;
}

export const SimpleBusinessTemplate: React.FC<SimpleBusinessTemplateProps> = ({
  primaryColor = '#000000',
  secondaryColor = '#f5f5f5',
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
  lineItemLabel = 'Item',
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
  balanceDueValue = '$15,154',
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
      width: 100%;
      min-height: 100%;
      font-family: Arial, sans-serif;
      color: #333;
      background-color: white;
      padding: 32px;
    `,
    // Header Section
    header: css`
      display: flex;
      margin-bottom: 40px;
    `,
    headerLeft: css`
      width: 33.333%;
    `,
    headerRight: css`
      width: 66.667%;
      font-size: 0.875rem;
    `,
    invoiceTitle: css`
      font-size: 2rem;
      font-weight: bold;
    `,
    headerGrid: css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    `,
    headerRow: css`
      display: flex;
      margin-bottom: 8px;
    `,
    headerLabel: css`
      font-weight: 600;
      width: 130px;
      text-align: right;
      padding-right: 8px;
    `,
    smallerHeaderLabel: css`
      font-weight: 600;
      width: 96px;
      text-align: right;
      padding-right: 8px;
    `,
    // Company Info Section
    companySection: css`
      display: flex;
      margin-bottom: 40px;
    `,
    logoSection: css`
      width: 25%;
    `,
    companyInfoSection: css`
      width: 75%;
      display: flex;
    `,
    logoContainer: css`
      width: 100%;
      height: 160px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e5e7eb;
    `,
    logoText: css`
      font-size: 1.5rem;
      font-weight: bold;
    `,
    addressSection: css`
      width: 50%;
      padding-left: 32px;
    `,
    addressTitle: css`
      font-weight: 600;
      margin-bottom: 8px;
    `,
    addressContent: css`
      line-height: 1.6;
    `,
    // Table Section
    tableContainer: css`
      width: 100%;
      margin-bottom: 40px;
    `,
    tableHeader: css`
      display: grid;
      grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr;
      border-bottom: 1px dashed #d1d5db;
      padding-bottom: 8px;
    `,
    tableHeaderCell: css`
      font-weight: 600;
      text-align: left;
      
      &:nth-child(3), &:nth-child(4), &:nth-child(5) {
        text-align: right;
      }
    `,
    tableRow: css`
      display: grid;
      grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr;
      padding: 16px 0;
      border-bottom: 1px dashed #d1d5db;
    `,
    tableCell: css`
      text-align: left;
      
      &:nth-child(3), &:nth-child(4), &:nth-child(5) {
        text-align: right;
      }
    `,
    // Summary Section
    summarySection: css`
      display: flex;
      justify-content: flex-end;
    `,
    summaryTable: css`
      width: 50%;
    `,
    summaryRow: css`
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px dashed #d1d5db;
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
          <div className={styles.headerLeft}>
            <div className={styles.invoiceTitle}>INVOICE</div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.headerGrid}>
              <div>
                {showInvoiceNumber && (
                  <div className={styles.headerRow}>
                    <div className={styles.headerLabel}>{invoiceNumberLabel}:</div>
                    <div>{invoiceNumber}</div>
                  </div>
                )}
                {showDateIssue && (
                  <div className={styles.headerRow}>
                    <div className={styles.headerLabel}>{dateIssueLabel}:</div>
                    <div>{dateIssue}</div>
                  </div>
                )}
              </div>
              <div>
                {showDueDate && (
                  <div className={styles.headerRow}>
                    <div className={styles.smallerHeaderLabel}>{dueDateLabel}:</div>
                    <div>{dueDate}</div>
                  </div>
                )}
                {showBalanceDue && (
                  <div className={styles.headerRow}>
                    <div className={styles.smallerHeaderLabel}>Balance:</div>
                    <div>{balanceDueValue}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Company Info Section */}
        <div className={styles.companySection}>
          <div className={styles.logoSection}>
            {showCompanyLogo && companyLogoUri ? (
              <img src={companyLogoUri} alt={companyName} style={{ width: '100%', height: 'auto' }} />
            ) : (
              <div className={styles.logoContainer}>
                <div className={styles.logoText}>LOGO</div>
              </div>
            )}
          </div>
          
          <div className={styles.companyInfoSection}>
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
        
        {/* Table Section */}
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderCell}>{lineItemLabel}</div>
            <div className={styles.tableHeaderCell}>Description</div>
            <div className={styles.tableHeaderCell}>{lineRateLabel}</div>
            <div className={styles.tableHeaderCell}>{lineQuantityLabel}</div>
            <div className={styles.tableHeaderCell}>{lineTotalLabel}</div>
          </div>
          
          {lines.map((line, index) => (
            <div key={index} className={styles.tableRow}>
              <div className={styles.tableCell}>{line.item}</div>
              <div className={styles.tableCell}>{line.description}</div>
              <div className={styles.tableCell}>{line.rate}</div>
              <div className={styles.tableCell}>{line.quantity}</div>
              <div className={styles.tableCell}>{line.total}</div>
            </div>
          ))}
        </div>
        
        {/* Summary Section */}
        <div className={styles.summarySection}>
          <div className={styles.summaryTable}>
            {showSubtotal && (
              <div className={styles.summaryRow}>
                <div className={`${styles.summaryLabel} bold`}>{subtotalLabel}</div>
                <div className={styles.summaryAmount}>{subtotal}</div>
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
        
        {/* Footer Removed to Match the Design */}
      </div>
    </PaperTemplate>
  );
}; 