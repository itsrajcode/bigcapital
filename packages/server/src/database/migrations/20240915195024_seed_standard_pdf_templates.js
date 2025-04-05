/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex('pdf_templates').insert([
    {
      resource: 'SaleInvoice',
      templateName: 'Standard Template',
      predefined: true,
      default: true,
    },
    {
      resource: 'SaleInvoice',
      templateName: 'New template one',
      predefined: true,
      default: false,
    },
    {
      resource: 'SaleInvoice',
      templateName: 'Modern Template',
      predefined: true,
      default: false,
    },
    {
      resource: 'SaleInvoice',
      templateName: 'Classic Template',
      predefined: true,
      default: false,
    },
    {
      resource: 'SaleInvoice',
      templateName: 'Minimalist Template',
      predefined: true,
      default: false,
    },
    {
      resource: 'SaleInvoice',
      templateName: 'Basic Template',
      predefined: true,
      default: false,
    },
    {
      resource: 'SaleInvoice',
      templateName: 'Minimal Basic Template',
      predefined: true,
      default: false,
    },
    {
      resource: 'SaleEstimate',
      templateName: 'Standard Template',
      predefined: true,
      default: true,
    },
    {
      resource: 'SaleReceipt',
      templateName: 'Standard Template',
      predefined: true,
      default: true,
    },
    {
      resource: 'CreditNote',
      templateName: 'Standard Template',
      predefined: true,
      default: true,
    },
    {
      resource: 'PaymentReceive',
      templateName: 'Standard Template',
      predefined: true,
      default: true,
    },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
