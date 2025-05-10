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

interface BasicLine {
  item?: string;
  description?: string;
  quantity?: string;
  rate?: string;
  total?: string;
}

interface BasicTax {
  label: string;
  amount: string;
}

export interface BasicTemplateProps {
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
  lines?: Array<BasicLine>;
  taxes?: Array<BasicTax>;
}

export const BasicTemplate: React.FC<BasicTemplateProps> = ({
  primaryColor = '#3b82f6',
  secondaryColor = '#f1f5f9',
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
      background-color: white;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      margin: 32px 0;
      display: flex;
    `,
    // Left Sidebar
    sidebar: css`
      width: 33.333%;
      background-color: ${secondaryColor};
      padding: 24px;
    `,
    sidebarSection: css`
      margin-bottom: 32px;
    `,
    sectionTitle: css`
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 8px;
    `,
    sectionContent: css`
      border-top: 1px solid #d1d5db;
      padding-top: 8px;
    `,
    detailsRow: css`
      display: flex;
      margin-bottom: 4px;
    `,
    detailsLabel: css`
      font-weight: 500;
    `,
    detailsValue: css`
      margin-left: 8px;
    `,
    addressBlock: css`
      line-height: 1.5;
    `,
    addressName: css`
      font-weight: 500;
    `,
    termsText: css`
      font-size: 0.875rem;
    `,
    // Main Content
    content: css`
      width: 66.667%;
      padding: 24px;
    `,
    headerTitle: css`
      text-align: center;
      margin-bottom: 64px;
    `,
    invoiceTitle: css`
      font-size: 2.25rem;
      font-weight: bold;
    `,
    // Table
    table: css`
      width: 100%;
      margin-bottom: 24px;
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
      &:nth-child(3), &:nth-child(4) {
        text-align: right;
      }
    `,
    tableRow: css`
      border-bottom: 1px solid #e5e7eb;
    `,
    tableCell: css`
      padding: 12px 16px;
      
      &:nth-child(2) {
        text-align: center;
      }
      &:nth-child(3), &:nth-child(4) {
        text-align: right;
      }
    `,
    itemTitle: css`
      font-weight: 500;
    `,
    itemDescription: css`
      font-size: 0.875rem;
      color: #6b7280;
    `,
    // Summary Section
    summarySection: css`
      background-color: #eff6ff;
      padding: 16px;
      margin-bottom: 24px;
    `,
    summaryRow: css`
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      
      &:last-child {
        margin-bottom: 0;
      }
    `,
    summaryDivider: css`
      border-top: 1px solid #d1d5db;
      padding-top: 8px;
      font-weight: 600;
    `,
    summaryLabel: css`
      font-weight: 500;
      
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
        {/* Left Sidebar */}
        <div className={styles.sidebar}>
          {/* Invoice Details Section */}
          <div className={styles.sidebarSection}>
            <div className={styles.sectionTitle}>Invoice Details</div>
            <div className={styles.sectionContent}>
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
          </div>
          
          {/* Customer Address Section */}
          {showCustomerAddress && (
            <div className={styles.sidebarSection}>
              <div className={styles.sectionTitle}>{billedToLabel}</div>
              <div className={styles.sectionContent}>
                <div 
                  className={styles.addressBlock}
                  dangerouslySetInnerHTML={{ 
                    __html: customerAddress
                      .replace('Bigcapital Technology, Inc.', `<p class="${styles.addressName}">Bigcapital Technology, Inc.</p>`)
                      .replace(/,/g, '') 
                  }}
                />
              </div>
            </div>
          )}
          
          {/* Company Address Section */}
          {showCompanyAddress && (
            <div className={styles.sidebarSection}>
              <div className={styles.sectionTitle}>From</div>
              <div className={styles.sectionContent}>
                <div 
                  className={styles.addressBlock}
                  dangerouslySetInnerHTML={{ 
                    __html: companyAddress
                      .replace('Bigcapital Technology, Inc.', `<p class="${styles.addressName}">Bigcapital Technology, Inc.</p>`)
                      .replace(/,/g, '') 
                  }}
                />
              </div>
            </div>
          )}
          
          {/* Terms & Conditions Section */}
          {showTermsConditions && (
            <div className={styles.sidebarSection}>
              <div className={styles.sectionTitle}>{termsConditionsLabel}</div>
              <div className={styles.sectionContent}>
                <div 
                  className={styles.termsText}
                  dangerouslySetInnerHTML={{ __html: termsConditions }}
                />
              </div>
            </div>
          )}
          
          {/* Statement Section */}
          {showStatement && (
            <div className={styles.sidebarSection}>
              <div className={styles.sectionTitle}>{statementLabel}</div>
              <div className={styles.sectionContent}>
                <div 
                  className={styles.termsText}
                  dangerouslySetInnerHTML={{ __html: statement }}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Main Content */}
        <div className={styles.content}>
          {/* Invoice Title */}
          <div className={styles.headerTitle}>
            <h1 className={styles.invoiceTitle}>INVOICE</h1>
          </div>
          
          {/* Invoice Table */}
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
          
          {/* Summary Section */}
          <div className={styles.summarySection}>
            {showSubtotal && (
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>{subtotalLabel}</span>
                <span>{subtotal}</span>
              </div>
            )}
            
            {showDiscount && (
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>{discountLabel}</span>
                <span>{discount}</span>
              </div>
            )}
            
            {showTaxes && taxes.map((tax, index) => (
              <div key={index} className={styles.summaryRow}>
                <span className={styles.summaryLabel}>{tax.label}</span>
                <span>{tax.amount}</span>
              </div>
            ))}
            
            {showTotal && (
              <div className={`${styles.summaryRow} ${styles.summaryDivider}`}>
                <span>{totalLabel}</span>
                <span>{total}</span>
              </div>
            )}
            
            {showPaymentMade && (
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>{paymentMadeLabel}</span>
                <span>{paymentMade}</span>
              </div>
            )}
            
            {showBalanceDue && (
              <div className={styles.summaryRow}>
                <span className={`${styles.summaryLabel} bold`}>{balanceDueLabel}</span>
                <span>{balanceDue}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </PaperTemplate>
  );
};