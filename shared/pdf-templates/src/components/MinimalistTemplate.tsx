import React from 'react';
import { css } from '@emotion/css';
import {  InvoiceCustomizeFormValues } from './types';
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

interface MinimalistLine {
  item?: string;
  description?: string;
  quantity?: string;
  rate?: string;
  total?: string;
}

interface MinimalistTax {
  label: string;
  amount: string;
}

export interface MinimalistTemplateProps {
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
  lines?: Array<MinimalistLine>;
  taxes?: Array<MinimalistTax>;
}

export const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({
  primaryColor = '#f9a048',
  secondaryColor = '#ffffff',
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
  billedToLabel = 'To:',
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
    `,
    headerSection: css`
      display: flex;
      justify-content: space-between;
      background-color: ${primaryColor};
      padding: 30px;
      color: white;
    `,
    logoContainer: css`
      width: 140px;
      height: 140px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e0e0e0;
      color: #333;
    `,
    logoText: css`
      font-size: 28px;
      font-weight: bold;
    `,
    invoiceDetailsContainer: css`
      margin-left: 30px;
      flex: 1;
    `,
    invoiceDetailsTitle: css`
      font-weight: bold;
      margin-bottom: 15px;
      font-size: 16px;
    `,
    invoiceDetail: css`
      margin-bottom: 5px;
      display: flex;
    `,
    invoiceDetailLabel: css`
      font-weight: bold;
      margin-right: 10px;
      width: 100px;
    `,
    invoiceTitle: css`
      font-size: 40px;
      font-weight: bold;
      text-align: right;
      margin-left: auto;
    `,
    addressSection: css`
      display: flex;
      justify-content: space-between;
      padding: 30px;
    `,
    addressBlock: css`
      max-width: 300px;
    `,
    addressTitle: css`
      font-weight: bold;
      margin-bottom: 10px;
    `,
    addressContent: css`
      line-height: 1.6;
    `,
    tableContainer: css`
      margin: 0 30px;
    `,
    tableHeader: css`
      display: grid;
      grid-template-columns: 1fr auto auto auto;
      padding: 15px;
      background-color: ${primaryColor};
      color: white;
      border-radius: 10px 10px 0 0;
      font-weight: bold;
    `,
    headerCell: css`
      text-align: left;
      &:last-child {
        text-align: right;
      }
    `,
    tableRow: css`
      display: grid;
      grid-template-columns: 1fr auto auto auto;
      padding: 15px;
      border-bottom: 1px solid #eee;
      &:nth-child(even) {
        background-color: #f9f9f9;
      }
    `,
    tableCell: css`
      text-align: left;
      &:last-child {
        text-align: right;
      }
    `,
    itemName: css`
      font-weight: bold;
    `,
    itemDescription: css`
      color: #666;
      font-size: 0.9em;
      margin-top: 5px;
    `,
    summarySection: css`
      margin: 30px;
      display: flex;
      justify-content: flex-end;
    `,
    summaryTable: css`
      width: 300px;
    `,
    summaryRow: css`
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
      &:last-child {
        border-top: 2px solid ${primaryColor};
        border-bottom: none;
        font-weight: bold;
        margin-top: 10px;
        padding-top: 10px;
      }
    `,
    subtotalRow: css`
      display: flex;
      justify-content: space-between;
      padding: 15px;
      background-color: ${primaryColor};
      color: white;
      font-weight: bold;
      border-radius: 5px;
      margin-bottom: 10px;
    `,
    footer: css`
      display: none;
    `,
    footerTitle: css`
      font-weight: bold;
      margin-bottom: 10px;
    `,
  };

  return (
    <PaperTemplate
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    >
      <div className={styles.invoiceContainer}>
        <div className={styles.headerSection}>
          {showCompanyLogo && companyLogoUri ? (
            <img src={companyLogoUri} alt={companyName} style={{ width: 140, height: 'auto' }} />
          ) : (
            <div className={styles.logoContainer}>
              <div className={styles.logoText}>LOGO</div>
            </div>
          )}
          
          <div className={styles.invoiceDetailsContainer}>
            <div className={styles.invoiceDetailsTitle}>Invoice Details</div>
            {showInvoiceNumber && (
              <div className={styles.invoiceDetail}>
                <div className={styles.invoiceDetailLabel}>{invoiceNumberLabel}:</div>
                <div>{invoiceNumber}</div>
              </div>
            )}
            {showDateIssue && (
              <div className={styles.invoiceDetail}>
                <div className={styles.invoiceDetailLabel}>{dateIssueLabel}:</div>
                <div>{dateIssue}</div>
              </div>
            )}
            {showDueDate && (
              <div className={styles.invoiceDetail}>
                <div className={styles.invoiceDetailLabel}>{dueDateLabel}:</div>
                <div>{dueDate}</div>
              </div>
            )}
          </div>
          
          <div className={styles.invoiceTitle}>
            INVOICE
          </div>
        </div>
        
        <div className={styles.addressSection}>
          {showCompanyAddress && (
            <div className={styles.addressBlock}>
              <div className={styles.addressTitle}>Office Address:</div>
              <div 
                className={styles.addressContent}
                dangerouslySetInnerHTML={{ __html: companyAddress.replace(/,/g, '') }}
              />
            </div>
          )}
          
          {showCustomerAddress && (
            <div className={styles.addressBlock}>
              <div className={styles.addressTitle}>{billedToLabel}</div>
              <div 
                className={styles.addressContent}
                dangerouslySetInnerHTML={{ __html: customerAddress.replace(/,/g, '') }}
              />
            </div>
          )}
        </div>
        
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>{lineItemLabel}</div>
            <div className={styles.headerCell}>{lineQuantityLabel}</div>
            <div className={styles.headerCell}>{lineRateLabel}</div>
            <div className={styles.headerCell}>{lineTotalLabel}</div>
          </div>
          
          {lines.map((line, index) => (
            <div key={index} className={styles.tableRow}>
              <div className={styles.tableCell}>
                <div className={styles.itemName}>{line.item}</div>
                <div className={styles.itemDescription}>{line.description}</div>
              </div>
              <div className={styles.tableCell}>{line.quantity}</div>
              <div className={styles.tableCell}>{line.rate}</div>
              <div className={styles.tableCell}>{line.total}</div>
            </div>
          ))}
        </div>
        
        <div className={styles.summarySection}>
          <div className={styles.summaryTable}>
            {showSubtotal && (
              <div className={styles.subtotalRow}>
                <div>{subtotalLabel}</div>
                <div>{subtotal}</div>
              </div>
            )}
            
            {showDiscount && (
              <div className={styles.summaryRow}>
                <div>{discountLabel}</div>
                <div>{discount}</div>
              </div>
            )}
            
            {showTaxes && taxes.map((tax, index) => (
              <div key={index} className={styles.summaryRow}>
                <div>{tax.label}</div>
                <div>{tax.amount}</div>
              </div>
            ))}
            
            {showTotal && (
              <div className={styles.summaryRow}>
                <div>{totalLabel}</div>
                <div>{total}</div>
              </div>
            )}
            
            {showPaymentMade && (
              <div className={styles.summaryRow}>
                <div>{paymentMadeLabel}</div>
                <div>{paymentMade}</div>
              </div>
            )}
            
            {showBalanceDue && (
              <div className={styles.summaryRow}>
                <div>{balanceDueLabel}</div>
                <div>{balanceDue}</div>
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.footer}>
          {showTermsConditions && (
            <div>
              <div className={styles.footerTitle}>{termsConditionsLabel}</div>
              <div dangerouslySetInnerHTML={{ __html: termsConditions }} />
            </div>
          )}
          
          {showStatement && (
            <div>
              <div className={styles.footerTitle}>{statementLabel}</div>
              <div dangerouslySetInnerHTML={{ __html: statement }} />
            </div>
          )}
        </div>
      </div>
    </PaperTemplate>
  );
}; 