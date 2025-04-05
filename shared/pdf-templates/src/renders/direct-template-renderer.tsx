import { InvoicePaperTemplateProps } from '../components/InvoicePaperTemplate';

export const renderInvoiceDirectly = (props: InvoicePaperTemplateProps) => {
  const {
    primaryColor = "#1976d2",
    secondaryColor = "#f5f9ff",
    invoiceNumber,
    invoiceNumberLabel,
    dateIssue,
    dateIssueLabel,
    dueDate,
    dueDateLabel,
    companyName,
    companyLogoUri,
    companyAddress,
    customerAddress,
    billedToLabel,
    lines = [],
    taxes = [],
    subtotal,
    discount,
    adjustment,
    total,
    paymentMade,
    dueAmount,
    termsConditions,
    statement,
    // other props
  } = props;

  // Generate HTML directly without React rendering
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Invoice</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Open Sans', sans-serif;
        color: #2c3e50;
        line-height: 1.5;
        margin: 0;
        padding: 0;
      }
      .container {
        padding: 30px;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-bottom: 30px;
        border-bottom: 1px solid #eaeef3;
        margin-bottom: 30px;
      }
      .header-left {
        flex: 1;
      }
      .invoice-title {
        font-size: 32px;
        font-weight: 700;
        color: ${primaryColor};
        margin-bottom: 15px;
        letter-spacing: -0.5px;
      }
      .terms-list {
        margin-top: 15px;
      }
      .terms-item {
        display: grid;
        grid-template-columns: 120px 1fr;
        margin-bottom: 8px;
      }
      .terms-item strong {
        color: #555;
        font-weight: 500;
      }
      .logo {
        max-width: 180px;
        max-height: 90px;
        object-fit: contain;
      }
      /* Add more styles as needed */
    </style>
</head>
<body>
    <div class="container">
      <div class="header">
        <div class="header-left">
          <div class="invoice-title">Invoice</div>
          <div class="terms-list">
            ${invoiceNumber ? 
              `<div class="terms-item">
                <strong>${invoiceNumberLabel}</strong>
                <span>${invoiceNumber}</span>
              </div>` : ''}
            ${dateIssue ? 
              `<div class="terms-item">
                <strong>${dateIssueLabel}</strong>
                <span>${dateIssue}</span>
              </div>` : ''}
            ${dueDate ? 
              `<div class="terms-item">
                <strong>${dueDateLabel}</strong>
                <span>${dueDate}</span>
              </div>` : ''}
          </div>
        </div>
        ${companyLogoUri ? 
          `<div>
            <img class="logo" src="${companyLogoUri}" alt="${companyName}" />
          </div>` : ''}
      </div>
      
      <!-- Continue with the rest of the template -->
      
    </div>
</body>
</html>`;
};