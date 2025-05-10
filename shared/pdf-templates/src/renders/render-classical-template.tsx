import { InvoicePaperTemplateProps } from "../components/InvoicePaperTemplate";
import { ClassicalTemplate } from "../components/ClassicalTemplate";
import { renderSSR } from "./render-ssr";

export const renderClassicalTemplateHtml = (
  props: InvoicePaperTemplateProps
) => {
  return renderSSR(<ClassicalTemplate {...props} />);
}; 