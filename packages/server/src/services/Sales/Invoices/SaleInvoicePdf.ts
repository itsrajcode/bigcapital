import { Inject, Service } from 'typedi';
import {
  renderInvoicePaperTemplateHtml,
  renderMinimalBasicTemplateHtml,
  renderModernCompactTemplateHtml,
  renderClassicalTemplateHtml,
  renderMinimalistTemplateHtml,
  renderSimpleBusinessTemplateHtml,
  renderBlackMinimalTemplateHtml,
  renderBasicTemplateHtml,
  InvoicePaperTemplateProps,
} from '@bigcapital/pdf-templates';
import { ChromiumlyTenancy } from '@/services/ChromiumlyTenancy/ChromiumlyTenancy';
import { GetSaleInvoice } from './GetSaleInvoice';
import HasTenancyService from '@/services/Tenancy/TenancyService';
import { transformInvoiceToPdfTemplate } from './utils';
import { SaleInvoicePdfTemplate } from './SaleInvoicePdfTemplate';
import { EventPublisher } from '@/lib/EventPublisher/EventPublisher';
import events from '@/subscribers/events';
/* import MinimalBasicTemplate  from '@/shared/pdf-templates/components/MinimalBasicTemplate' */;

@Service()
export class SaleInvoicePdf {
  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private chromiumlyTenancy: ChromiumlyTenancy;

  @Inject()
  private getInvoiceService: GetSaleInvoice;

  @Inject()
  private invoiceBrandingTemplateService: SaleInvoicePdfTemplate;

  @Inject()
  private eventPublisher: EventPublisher;

  /**
   * Retrieve sale invoice html content.
   * @param {number} tenantId - Tenant Id.
   * @param {ISaleInvoice} saleInvoice -
   * @returns {Promise<string>}
   */
  public async saleInvoiceHtml(
    tenantId: number,
    invoiceId: number
  ): Promise<string> {
    const brandingAttributes = await this.getInvoiceBrandingAttributes(
      tenantId,
      invoiceId
    );
    
    // Debug: Log the template name being used
    console.log("DEBUG - Template selection:", brandingAttributes.templateName);
    
    switch(brandingAttributes.templateName) {
      case 'Minimal Basic Template':
        console.log("Rendering: Minimal Basic Template");
        return renderMinimalBasicTemplateHtml(brandingAttributes);
      case 'Modern Template':
        console.log("Rendering: Modern Template");
        return renderModernCompactTemplateHtml(brandingAttributes);
      case 'Classic Template':
        console.log("Rendering: Classic Template");
        return renderClassicalTemplateHtml(brandingAttributes);
      case 'Minimalist Template':
        console.log("Rendering: Minimalist Template");
        return renderMinimalistTemplateHtml(brandingAttributes);
      case 'New template one':
        console.log("Rendering: New template one");
        return renderSimpleBusinessTemplateHtml(brandingAttributes);
      case 'Black Minimal Template':
        console.log("Rendering: Black Minimal Template");
        return renderBlackMinimalTemplateHtml(brandingAttributes);
      case 'Basic Template':
        console.log("Rendering: Basic Template");
        return renderBasicTemplateHtml(brandingAttributes);
      default:
        console.log("Rendering: Default template (no match found)");
        return renderInvoicePaperTemplateHtml(brandingAttributes);
    }
  }

  /**
   * Retrieve sale invoice pdf content.
   * @param {number} tenantId - Tenant Id.
   * @param {ISaleInvoice} saleInvoice -
   * @returns {Promise<[Buffer, string]>}
   */
  public async saleInvoicePdf(
    tenantId: number,
    invoiceId: number
  ): Promise<[Buffer, string]> {
    const filename = await this.getInvoicePdfFilename(tenantId, invoiceId);

    const htmlContent = await this.saleInvoiceHtml(tenantId, invoiceId);

    // Converts the given html content to pdf document.
    const buffer = await this.chromiumlyTenancy.convertHtmlContent(
      tenantId,
      htmlContent
    );
    const eventPayload = { tenantId, saleInvoiceId: invoiceId };

    // Triggers the `onSaleInvoicePdfViewed` event.
    await this.eventPublisher.emitAsync(
      events.saleInvoice.onPdfViewed,
      eventPayload
    );
    return [buffer, filename];
  }

  /**
   * Retrieves the filename pdf document of the given invoice.
   * @param {number} tenantId
   * @param {number} invoiceId
   * @returns {Promise<string>}
   */
  private async getInvoicePdfFilename(
    tenantId: number,
    invoiceId: number
  ): Promise<string> {
    const { SaleInvoice } = this.tenancy.models(tenantId);

    const invoice = await SaleInvoice.query().findById(invoiceId);

    return `Invoice-${invoice.invoiceNo}`;
  }

  /**
   * Retrieves the branding attributes of the given sale invoice.
   * @param {number} tenantId
   * @param {number} invoiceId
   * @returns {Promise<InvoicePdfTemplateAttributes>}
   */
  async getInvoiceBrandingAttributes(
    tenantId: number,
    invoiceId: number
  ): Promise<InvoicePaperTemplateProps> {
    const { PdfTemplate } = this.tenancy.models(tenantId);
    
    // Get the invoice from the database.
    const invoice = await this.getInvoiceService.getSaleInvoice(
      tenantId,
      invoiceId
    );
    
    console.log("Invoice pdfTemplateId:", invoice.pdfTemplateId);
    
    // Add minimal basic template option
    const templateId = invoice.pdfTemplateId ?? (
      await PdfTemplate.query().findOne({
        resource: 'SaleInvoice',
        templateName: 'Minimal Basic Template' // or default: true for default
      })
    )?.id;
    
    console.log("Using templateId:", templateId);
    
    //  Getting the branding template attributes.
    const brandingTemplate =
      await this.invoiceBrandingTemplateService.getInvoicePdfTemplate(
        tenantId,
        templateId
      );

    console.log("Brand template name from service:", brandingTemplate.templateName);
    
    // Merge the branding template attributes with the invoice data
    const templateProps = {
      ...brandingTemplate.attributes,
      ...transformInvoiceToPdfTemplate(invoice),
      templateName: brandingTemplate.templateName, // Add templateName explicitly
    };
    
    console.log("Final templateName being passed to renderer:", templateProps.templateName);
    
    return templateProps;
  }
}
