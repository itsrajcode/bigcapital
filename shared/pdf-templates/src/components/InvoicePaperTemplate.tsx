import { isEmpty } from "lodash";
import { css } from "@emotion/css";
import {
  PaperTemplate,
  PaperTemplateProps,
  PaperTemplateTotalBorder,
} from "./PaperTemplate";
import { Box } from "../lib/layout/Box";
import { Text } from "../lib/text/Text";
import { Stack } from "../lib/layout/Stack";
import { Group } from "../lib/layout/Group";
import {
  DefaultPdfTemplateTerms,
  DefaultPdfTemplateItemDescription,
  DefaultPdfTemplateStatement,
  DefaultPdfTemplateItemName,
  DefaultPdfTemplateAddressBilledTo,
  DefaultPdfTemplateAddressBilledFrom,
} from "./_constants";

interface InvoiceLine {
  item?: string;
  description?: string;
  quantity?: string;
  rate?: string;
  total?: string;
  discount?: string;
}

interface InvoiceTaxLine {
  label: string;
  amount: string;
}

export interface InvoicePaperTemplateProps extends PaperTemplateProps {
  primaryColor?: string;
  secondaryColor?: string;

  // Company
  showCompanyLogo?: boolean;
  companyLogoUri?: string;

  // Invoice number
  showInvoiceNumber?: boolean;
  invoiceNumber?: string;
  invoiceNumberLabel?: string;

  // Date of issue
  showDateIssue?: boolean;
  dateIssue?: string;
  dateIssueLabel?: string;

  // Due date
  showDueDate?: boolean;
  dueDate?: string;
  dueDateLabel?: string;

  companyName?: string;
  bigtitle?: string;

  // Address
  showCustomerAddress?: boolean;
  customerAddress?: string;

  showCompanyAddress?: boolean;
  companyAddress?: string;

  billedToLabel?: string;

  // Entries
  lineItemLabel?: string;
  lineQuantityLabel?: string;
  lineRateLabel?: string;
  lineTotalLabel?: string;

  // # Line Discount
  lineDiscountLabel?: string;
  showLineDiscount?: boolean;

  // Total
  showTotal?: boolean;
  totalLabel?: string;
  total?: string;

  // Discount
  showDiscount?: boolean;
  discountLabel?: string;
  discount?: string;

  // Adjustment
  showAdjustment?: boolean;
  adjustmentLabel?: string;
  adjustment?: string;

  // Subtotal
  showSubtotal?: boolean;
  subtotalLabel?: string;
  subtotal?: string;

  // Payment made
  showPaymentMade?: boolean;
  paymentMadeLabel?: string;
  paymentMade?: string;

  showTaxes?: boolean;

  // Due Amount
  showDueAmount?: boolean;
  dueAmountLabel?: string;
  dueAmount?: string;

  // Footer
  termsConditionsLabel?: string;
  showTermsConditions?: boolean;
  termsConditions?: string;

  // Statement
  statementLabel?: string;
  showStatement?: boolean;
  statement?: string;

  lines?: Array<InvoiceLine>;
  taxes?: Array<InvoiceTaxLine>;

  templateName?: string;
}

export function InvoicePaperTemplate({
  // # Colors
  primaryColor = "#1976d2",
  secondaryColor = "#f5f9ff",

  // # Company.
  companyName = "Bigcapital Technology, Inc.",

  showCompanyLogo = true,
  companyLogoUri = "",

  // # Due date
  dueDate = "September 3, 2024",
  dueDateLabel = "Date due",
  showDueDate = true,

  // # Issue date.
  dateIssue = "September 3, 2024",
  dateIssueLabel = "Date of issue",
  showDateIssue = true,

  // Invoice #,
  invoiceNumberLabel = "Invoice number",
  invoiceNumber = "346D3D40-0001",
  showInvoiceNumber = true,

  // Address
  showCustomerAddress = true,
  customerAddress = DefaultPdfTemplateAddressBilledTo,

  showCompanyAddress = true,
  companyAddress = DefaultPdfTemplateAddressBilledFrom,

  billedToLabel = "Billed To",

  // Entries
  lineItemLabel = "Item",
  lineQuantityLabel = "Qty",
  lineRateLabel = "Rate",
  lineTotalLabel = "Total",

  totalLabel = "Total",
  subtotalLabel = "Subtotal",
  discountLabel = "Discount",
  adjustmentLabel = "Adjustment",
  paymentMadeLabel = "Payment Made",
  dueAmountLabel = "Balance Due",

  // # Line Discount
  lineDiscountLabel = "Discount",
  showLineDiscount = false,

  // Totals
  showTotal = true,
  total = "$662.75",

  showSubtotal = true,
  showDiscount = true,
  showTaxes = true,
  showPaymentMade = true,
  showDueAmount = true,
  showAdjustment = true,

  subtotal = "630.00",
  discount = "0.00",
  adjustment = "",
  paymentMade = "100.00",
  dueAmount = "$562.75",

  // Footer paragraphs.
  termsConditionsLabel = "Terms & Conditions",
  showTermsConditions = true,
  termsConditions = DefaultPdfTemplateTerms,

  lines = [
    {
      item: DefaultPdfTemplateItemName,
      description: DefaultPdfTemplateItemDescription,
      rate: "1",
      quantity: "1000",
      total: "$1000.00",
    },
  ],
  taxes = [
    { label: "Sample Tax1 (4.70%)", amount: "11.75" },
    { label: "Sample Tax2 (7.00%)", amount: "21.74" },
  ],

  // # Statement
  statementLabel = "Statement",
  showStatement = true,
  statement = DefaultPdfTemplateStatement,
  ...props
}: InvoicePaperTemplateProps) {
  // Define enhanced styles
  const styles = {
    test:css`
      color: red;
      font-size: 20px;
      font-weight: 700;
      text-align: center;
      margin: 20px 0;
      padding: 10px;
      background-color: #f0f0f0;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s ease;
    `,
    container: css`
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #2c3e50;
      line-height: 1.5;
      padding: 0 30px;
    `,
    header: css`
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 30px;
      border-bottom: 100px solid #000000;
      margin-bottom: 30px;
    `,
    headerLeft: css`
      flex: 1;
    `,
    invoiceTitle: css`
      font-size: 32px;
      font-weight: 700;
      color: ${primaryColor};
      margin-bottom: 15px;
      letter-spacing: -0.5px;
    `,
    termsList: css`
      margin-top: 15px;
    `,
    termsItem: css`
      display: grid;
      grid-template-columns: 120px 1fr;
      margin-bottom: 8px;
      
      & strong {
        color: #555;
        font-weight: 500;
      }
    `,
    logo: css`
      max-width: 180px;
      max-height: 90px;
      object-fit: contain;
    `,
    addressSection: css`
      display: flex;
      gap: 30px;
      margin: 30px 0;
    `,
    addressBox: css`
      flex: 1;
      background-color: ${secondaryColor};
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
      
      & strong {
        display: block;
        margin-bottom: 8px;
        color: ${primaryColor};
        font-weight: 600;
      }
    `,
    tableContainer: css`
      margin: 30px 0;
    `,
    table: css`
      width: 100%;
      border-collapse: collapse;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      
      & th {
        background-color: ${secondaryColor};
        text-align: left;
        padding: 15px;
        font-weight: 600;
        color: #333;
      }
      
      & td {
        padding: 15px;
        border-bottom: 1px solid #eaeef3;
        vertical-align: top;
      }
      
      & tr:last-child td {
        border-bottom: none;
      }
      
      & tr:nth-child(even) {
        background-color: #fafbfd;
      }
    `,
    itemName: css`
      font-weight: 600;
      margin-bottom: 4px;
    `,
    itemDescription: css`
      color: #5f6b7c;
      font-size: 14px;
    `,
    totalsSection: css`
      margin-left: auto;
      width: 50%;
    `,
    totalLine: css`
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      
      &.subtotal {
        background-color: ${secondaryColor};
        padding: 12px 15px;
        border-radius: 6px;
        font-weight: 500;
        margin-bottom: 10px;
      }
      
      &.total, &.due {
        font-weight: 700;
        font-size: 18px;
        color: ${primaryColor};
        border-top: 2px solid #ddd;
        margin-top: 5px;
        padding-top: 15px;
      }
    `,
    footer: css`
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #eaeef3;
    `,
    statement: css`
      margin-bottom: 20px;
      
      & strong {
        display: block;
        margin-bottom: 8px;
        color: ${primaryColor};
        font-size: 16px;
        font-weight: 600;
      }
      
      & div {
        font-size: 14px;
        color: #555;
        line-height: 1.6;
      }
    `,
  };

  return (
    <PaperTemplate
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      {...props}
    >
      
      <div className={styles.container}>
        {/* Header Section */}
        <div className="test">
        test name 
      </div>
      sdhfkjsdhfgkjsdhgkjhsdkghsdklhgsd
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.invoiceTitle}>khsdgfkfdkgskfdjhg</div>
            
            <div className={styles.termsList}>
              {showInvoiceNumber && (
                <div className={styles.termsItem}>
                  <strong>{invoiceNumberLabel}</strong>
                  <span>{invoiceNumber}</span>
                </div>
              )}
              {showDateIssue && (
                <div className={styles.termsItem}>
                  <strong>{dateIssueLabel}</strong>
                  <span>{dateIssue}</span>
                </div>
              )}
              {showDueDate && (
                <div className={styles.termsItem}>
                  <strong>{dueDateLabel}</strong>
                  <span>{dueDate}</span>
                </div>
              )}
            </div>
          </div>
          
          {showCompanyLogo && companyLogoUri && (
            <div>
              <img className={styles.logo} src={companyLogoUri} alt={companyName} />
            </div>
          )}
        </div>
        
        {/* Address Section */}
        <div className={styles.addressSection}>
          {showCompanyAddress && (
            <div className={styles.addressBox}>
              <strong>From</strong>
              <div dangerouslySetInnerHTML={{ __html: companyAddress }} />
            </div>
          )}
          {showCustomerAddress && (
            <div className={styles.addressBox}>
              <strong>{billedToLabel}</strong>
              <div dangerouslySetInnerHTML={{ __html: customerAddress }} />
            </div>
          )}
        </div>
        
        {/* Items Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '50%' }}>{lineItemLabel}</th>
                <th style={{ textAlign: 'right' }}>{lineQuantityLabel}</th>
                <th style={{ textAlign: 'right' }}>{lineRateLabel}</th>
                {showLineDiscount && <th style={{ textAlign: 'right' }}>{lineDiscountLabel}</th>}
                <th style={{ textAlign: 'right' }}>{lineTotalLabel}</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, index) => (
                <tr key={index}>
                  <td>
                    <div className={styles.itemName}>{line.item}</div>
                    {line.description && (
                      <div className={styles.itemDescription}>{line.description}</div>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>{line.quantity}</td>
                  <td style={{ textAlign: 'right' }}>{line.rate}</td>
                  {showLineDiscount && <td style={{ textAlign: 'right' }}>{line.discount}</td>}
                  <td style={{ textAlign: 'right' }}>{line.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Totals Section */}
        <div className={styles.totalsSection}>
          {showSubtotal && (
            <div className={`${styles.totalLine} subtotal`}>
              <span>{subtotalLabel}</span>
              <span>{subtotal}</span>
            </div>
          )}
          
          {showDiscount && !isEmpty(discount) && (
            <div className={styles.totalLine}>
              <span>{discountLabel}</span>
              <span>{discount}</span>
            </div>
          )}
          
          {showAdjustment && !isEmpty(adjustment) && (
            <div className={styles.totalLine}>
              <span>{adjustmentLabel}</span>
              <span>{adjustment}</span>
            </div>
          )}
          
          {showTaxes && taxes.map((tax, index) => (
            <div key={index} className={styles.totalLine}>
              <span>{tax.label}</span>
              <span>{tax.amount}</span>
            </div>
          ))}
          
          {showTotal && (
            <div className={`${styles.totalLine} total`}>
              <span>{totalLabel}</span>
              <span>{total}</span>
            </div>
          )}
          
          {showPaymentMade && !isEmpty(paymentMade) && (
            <div className={styles.totalLine}>
              <span>{paymentMadeLabel}</span>
              <span>{paymentMade}</span>
            </div>
          )}
          
          {showDueAmount && !isEmpty(dueAmount) && (
            <div className={`${styles.totalLine} due`}>
              <span>{dueAmountLabel}</span>
              <span>{dueAmount}</span>
            </div>
          )}
        </div>
        
        {/* Footer */}
        {(showTermsConditions || showStatement) && (
          <div className={styles.footer}>
            {showTermsConditions && !isEmpty(termsConditions) && (
              <div className={styles.statement}>
                <strong>{termsConditionsLabel}</strong>
                <div dangerouslySetInnerHTML={{ __html: termsConditions }} />
              </div>
            )}
            
            {showStatement && !isEmpty(statement) && (
              <div className={styles.statement}>
                <strong>{statementLabel}</strong>
                <div dangerouslySetInnerHTML={{ __html: statement }} />
              </div>
            )}
          </div>
        )}
      </div>
    </PaperTemplate>
  );
}
