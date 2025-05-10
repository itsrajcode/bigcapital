import { Inject, Service } from 'typedi';
import { mergePdfTemplateWithDefaultAttributes } from './utils';
import { GetPdfTemplate } from '@/services/PdfTemplate/GetPdfTemplate';
import { defaultInvoicePdfTemplateAttributes } from './constants';
import { GetOrganizationBrandingAttributes } from '@/services/PdfTemplate/GetOrganizationBrandingAttributes';

@Service()
export class SaleInvoicePdfTemplate {
  @Inject()
  private getPdfTemplateService: GetPdfTemplate;

  @Inject()
  private getOrgBrandingAttributes: GetOrganizationBrandingAttributes;

  /**
   * Retrieves the invoice pdf template.
   * @param {number} tenantId
   * @param {number} invoiceTemplateId
   * @returns
   */
  async getInvoicePdfTemplate(tenantId: number, invoiceTemplateId: number) {
    console.log("Getting template with ID:", invoiceTemplateId);
    
    const template = await this.getPdfTemplateService.getPdfTemplate(
      tenantId,
      invoiceTemplateId
    );
    
    console.log("Retrieved template:", {
      id: template.id,
      templateName: template.templateName,
      hasAttributes: !!template.attributes
    });
    
    if (template.templateName === 'Minimal Basic Template') {
      return {
        ...template,
        attributes: {
          ...defaultInvoicePdfTemplateAttributes.minimalBasicTemplate,
          ...template.attributes,
          bigtitle: "It's working"
        }
      };
    }

    // Retrieves the organization branding attributes.
    const commonOrgBrandingAttrs =
      await this.getOrgBrandingAttributes.getOrganizationBrandingAttributes(
        tenantId
      );
    const organizationBrandingAttrs = {
      ...defaultInvoicePdfTemplateAttributes,
      ...commonOrgBrandingAttrs,
    };
    const brandingTemplateAttrs = {
      ...template.attributes,
      companyLogoUri: template.companyLogoUri,
    };
    const attributes = mergePdfTemplateWithDefaultAttributes(
      brandingTemplateAttrs,
      organizationBrandingAttrs
    );
    
    console.log("Final template being returned:", {
      templateName: template.templateName,
      hasAttributes: !!attributes
    });
    
    return {
      ...template,
      attributes,
    };
  }
}
