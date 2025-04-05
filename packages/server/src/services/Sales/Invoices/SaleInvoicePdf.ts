import { Inject, Service } from 'typedi';
import {
  renderInvoicePaperTemplateHtml,
  renderMinimalBasicTemplateHtml,
  InvoicePaperTemplateProps,
  MinimalBasicTemplate,
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
    console.log('brandingAttributes', brandingAttributes);
    if(brandingAttributes.templateName === 'Minimal Basic Template') {
      console.log("fhir ek baar")
      const data =  renderMinimalBasicTemplateHtml()
      console.log("MINI",data)
      return data
    }
    const data =  renderInvoicePaperTemplateHtml(brandingAttributes);
    console.log("data",data)
    return data;
   
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
    console.log("data form backend",PdfTemplate)
    // Get the invoice from the database.
    const invoice = await this.getInvoiceService.getSaleInvoice(
      tenantId,
      invoiceId
    );
    
    // Add minimal basic template option
    const templateId = invoice.pdfTemplateId ?? (
      await PdfTemplate.query().findOne({
        resource: 'SaleInvoice',
        templateName: 'Minimal Basic Template' // or default: true for default
      })
    )?.id;
    
    //  Getting the branding template attributes.
    const brandingTemplate =
      await this.invoiceBrandingTemplateService.getInvoicePdfTemplate(
        tenantId,
        templateId
      );

      console.log("templateId",brandingTemplate.templateName)
    // Merge the branding template attributes with the invoice.
    if (brandingTemplate.templateName === 'Minimal Basic Template') {
      console.log("hsdgfjhgsd")
      const minimalTemplateProps = {
        ...brandingTemplate.attributes,
        ...transformInvoiceToPdfTemplate(invoice),
      };
      
      // Pass the merged data to the render function
      minimalTemplateProps['templateName'] = brandingTemplate.templateName;
      return minimalTemplateProps
    }
    return {
      ...brandingTemplate.attributes,
      ...transformInvoiceToPdfTemplate(invoice),
    };
  }
}
