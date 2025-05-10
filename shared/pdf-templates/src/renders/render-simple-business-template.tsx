import { InvoicePaperTemplateProps } from "../components/InvoicePaperTemplate";
import { SimpleBusinessTemplate } from "../components/SimpleBusinessTemplate";
import { renderSSR } from "./render-ssr";

export const renderSimpleBusinessTemplateHtml = (
  props: InvoicePaperTemplateProps
) => {
  return renderSSR(<SimpleBusinessTemplate {...props} />);
}; 