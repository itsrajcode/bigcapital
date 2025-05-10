import { InvoicePaperTemplateProps } from "../components/InvoicePaperTemplate";
import { BlackMinimalTemplate } from "../components/BlackMinimalTemplate";
import { renderSSR } from "./render-ssr";

export const renderBlackMinimalTemplateHtml = (
  props: InvoicePaperTemplateProps
) => {
  return renderSSR(<BlackMinimalTemplate {...props} />);
}; 