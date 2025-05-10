import { InvoicePaperTemplateProps } from "../components/InvoicePaperTemplate";
import { MinimalistTemplate } from "../components/MinimalistTemplate";
import { renderSSR } from "./render-ssr";

export const renderMinimalistTemplateHtml = (
  props: InvoicePaperTemplateProps
) => {
  return renderSSR(<MinimalistTemplate {...props} />);
}; 