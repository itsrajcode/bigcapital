import { InvoicePaperTemplateProps } from "../components/InvoicePaperTemplate";
import { ModernCompactTemplate } from "../components/ModernCompactTemplate";
import { renderSSR } from "./render-ssr";

export const renderModernCompactTemplateHtml = (
  props: InvoicePaperTemplateProps
) => {
  return renderSSR(<ModernCompactTemplate {...props} />);
}; 