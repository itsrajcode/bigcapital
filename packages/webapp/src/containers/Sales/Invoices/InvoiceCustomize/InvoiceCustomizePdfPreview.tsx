import * as R from 'ramda';
import { useFormikContext } from 'formik';
import {
  InvoicePaperTemplate,
  InvoicePaperTemplateProps,
} from './InvoicePaperTemplate';
import { MinimalBasicTemplate } from './MinimalBasicInvoice';
import { ModernCompactTemplate } from './ModernCompactTemplate';
import { ClassicalTemplate } from './ClassicalTemplate';
import { SimpleBusinessTemplate } from './SimpleBusinessTemplate';
import { MinimalistTemplate } from './MinimalistTemplate';
import { BlackMinimalTemplate } from './BlackMinimalTemplate';
import { BasicTemplate } from './BasicTemplate';
import { useElementCustomizeContext } from '@/containers/ElementCustomize/ElementCustomizeProvider';
import { InvoiceCustomizeFormValues } from './types';
import { Box } from '@/components';
import { useBrandingTemplateBoot } from '@/containers/BrandingTemplates/BrandingTemplateBoot';

/**
 * Injects the `InvoicePaperTemplate` component props from the form and branding states.
 * @param {React.ComponentType<P>} Component
 * @returns {JSX.Element}
 */
const withInvoicePreviewTemplateProps = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  return (props: Omit<P, keyof InvoicePaperTemplateProps>) => {
    const { values } = useFormikContext<InvoiceCustomizeFormValues>();
    const { brandingState } = useElementCustomizeContext();
    const { pdfTemplate } = useBrandingTemplateBoot();

    const mergedProps: InvoicePaperTemplateProps = {
      ...brandingState,
      ...values,
    };

    // First check the form's templateStyle field (for new/editing templates)
    // Fall back to the pdfTemplate.templateName for existing templates
    const templateStyle = values.templateStyle || pdfTemplate?.templateName || '';

    return (
      <Box px={4} py={6}>
        {templateStyle === 'Minimalist Template' ? (
          <MinimalistTemplate {...(props as P)} {...mergedProps} />
        ) : templateStyle === 'New template one' ? (
          <SimpleBusinessTemplate {...(props as P)} {...mergedProps} />
        ) : templateStyle === 'Classic Template' ? (
          <ClassicalTemplate {...(props as P)} {...mergedProps} />
        ) : templateStyle === 'Modern Template' ? (
          <ModernCompactTemplate {...(props as P)} {...mergedProps} />
        ) : templateStyle === 'Black Minimal Template' ? (
          <BlackMinimalTemplate {...(props as P)} {...mergedProps} />
        ) : templateStyle === 'Basic Template' ? (
          <BasicTemplate {...(props as P)} {...mergedProps} />
        ) : templateStyle === 'Minimal Basic Template' ? (
          <MinimalBasicTemplate {...(props as P)} {...mergedProps} />
        ) : (
          <Component {...(props as P)} {...mergedProps} />
        )}
      </Box>
    );
  };
};

export const InvoiceCustomizePdfPreview = R.compose(
  withInvoicePreviewTemplateProps,
)(InvoicePaperTemplate);
