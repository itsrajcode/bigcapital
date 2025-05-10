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
} from "../constants/PdfTemplates";

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
 interface InvoicePaperTemplateProps extends PaperTemplateProps {
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

export function MinimalInvoiceTemplate({
  // # Colors
  primaryColor = "#000000",
  secondaryColor = "#e1f3fa",

  // # Company.
  companyName = "sdgdfgdfgds Technology, Inc.",

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
  // Define styles like in MinimalBasicTemplate
  const styles = {
    invoiceContainer: css`
      width: 100%;
      min-height: 100%;
      padding: 30px;
      font-family: 'Outfit', sans-serif;
      background-color: red;
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
    summaryTable: css`
      width: 50%;
      margin-left: auto;
      margin-bottom: 10px;

      th {
        background-color: ${secondaryColor};
        padding: 10px;
        height: 70px;
        border-bottom: 1px solid #e0e0e0;
        font-size: 20px;
      }

      td {
        padding: 10px;
        height: 40px;
        border-bottom: 1px solid #e0e0e0;
        font-size: 14px;
      }

      td:first-child {
        width: 70%;
      }

      td:last-child {
        text-align: right;
      }

      .subtotal-row td, .subtotal-row th {
        background-color: ${secondaryColor};
        font-weight: 600;
      }

      .total-row td,
      .balance-row td {
        font-weight: 600;
        border-top: 2px solid #000;
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
    logoContainer: css`
      max-width: 200px;
      max-height: 100px;
    `,
    logo: css`
      max-width: 100%;
      max-height: 100%;
    `,
  };

  return (
    <PaperTemplate
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      {...props}
    >
      <div className={styles.invoiceContainer}>
        {/* Header Section with Logo */}
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

        {/* Address Section */}
        {(showCustomerAddress || showCompanyAddress) && (
          <div className={styles.addressContainer}>
            {showCompanyAddress && (
              <div className={styles.addressSection}>
                <div className={styles.addressTitle}>From</div>
                <div
                  className={styles.addressContent}
                  dangerouslySetInnerHTML={{ __html: companyAddress }}
                />
              </div>
            )}
            {showCustomerAddress && (
              <div className={styles.addressSection}>
                <div className={styles.addressTitle}>{billedToLabel}</div>
                <div
                  className={styles.addressContent}
                  dangerouslySetInnerHTML={{ __html: customerAddress }}
                />
              </div>
            )}
          </div>
        )}

        {/* Line Items Table */}
        <table className={styles.invoiceTable}>
          <thead>
            <tr>
              <th style={{ width: '60%' }}>{lineItemLabel}</th>
              <th>{lineQuantityLabel}</th>
              <th>{lineRateLabel}</th>
              {showLineDiscount && <th>{lineDiscountLabel}</th>}
              <th>{lineTotalLabel}</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, index) => (
              <tr key={index}>
                <td>
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>{line.item}</div>
                  {line.description && (
                    <div style={{ color: '#666', fontSize: '12px' }}>{line.description}</div>
                  )}
                </td>
                <td>{line.quantity}</td>
                <td>{line.rate}</td>
                {showLineDiscount && <td>{line.discount}</td>}
                <td>{line.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary Table */}
        <table className={styles.summaryTable}>
          {showSubtotal && (
            <tr className="subtotal-row">
              <th>{subtotalLabel}</th>
              <th>{subtotal}</th>
            </tr>
          )}
          {showDiscount && !isEmpty(discount) && (
            <tr>
              <td>{discountLabel}</td>
              <td>{discount}</td>
            </tr>
          )}
          {showAdjustment && !isEmpty(adjustment) && (
            <tr>
              <td>{adjustmentLabel}</td>
              <td>{adjustment}</td>
            </tr>
          )}
          {showTaxes &&
            taxes.map((tax, index) => (
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
          {showPaymentMade && !isEmpty(paymentMade) && (
            <tr>
              <td>{paymentMadeLabel}</td>
              <td>{paymentMade}</td>
            </tr>
          )}
          {showDueAmount && !isEmpty(dueAmount) && (
            <tr className="balance-row">
              <td>{dueAmountLabel}</td>
              <td>{dueAmount}</td>
            </tr>
          )}
        </table>

        {/* Footer Section */}
        {(showTermsConditions || showStatement) && (
          <div className={styles.footerSection}>
            {showTermsConditions && !isEmpty(termsConditions) && (
              <div className={styles.termsSection}>
                <div className={styles.termsTitle}>{termsConditionsLabel}</div>
                <div
                  className={styles.termsContent}
                  dangerouslySetInnerHTML={{ __html: termsConditions }}
                />
              </div>
            )}
            {showStatement && !isEmpty(statement) && (
              <div className={styles.statementSection}>
                <div className={styles.statementTitle}>{statementLabel}</div>
                <div
                  className={styles.statementContent}
                  dangerouslySetInnerHTML={{ __html: statement }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </PaperTemplate>
  );
}