import { useContext } from 'react';
import { PdfTemplateContext } from './BrandingTemplateBoot';

export const useBrandingTemplateBoot = () => {
  const context = useContext(PdfTemplateContext);
  if (!context) {
    throw new Error(
      'useBrandingTemplateBoot must be used within a BrandingTemplateBoot',
    );
  }
  return context;
}; 