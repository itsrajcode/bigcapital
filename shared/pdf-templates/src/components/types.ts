import { PaperTemplateProps } from './PaperTemplate';

export interface InvoiceCustomizeFormValues extends PaperTemplateProps {
  primaryColor?: string;
  secondaryColor?: string;
  templateStyle?: string;
  
  // Company details
  companyName?: string;
  companyLogoUri?: string;
  companyAddress?: string;
  
  // Invoice details
  invoiceNumber?: string;
  dateIssue?: string;
  dueDate?: string;
  
  // Labels
  invoiceNumberLabel?: string;
  dateIssueLabel?: string;
  dueDateLabel?: string;
  billedToLabel?: string;
  
  // Customer details
  customerAddress?: string;
  
  // Line items
  lineItemLabel?: string;
  lineQuantityLabel?: string;
  lineRateLabel?: string;
  lineTotalLabel?: string;
  lineDiscountLabel?: string;
  
  // Totals
  subtotalLabel?: string;
  discountLabel?: string;
  taxLabel?: string;
  totalLabel?: string;
  dueAmountLabel?: string;
  
  // Footer
  termsConditionsLabel?: string;
  termsConditions?: string;
  statementLabel?: string;
  statement?: string;
} 