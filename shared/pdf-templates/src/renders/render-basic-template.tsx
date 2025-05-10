import { InvoicePaperTemplateProps } from "../components/InvoicePaperTemplate";
import { BasicTemplate } from "../components/BasicTemplate";
import { renderSSR } from "./render-ssr";

export const renderBasicTemplateHtml = (
  props: InvoicePaperTemplateProps
) => {
  return renderSSR(<BasicTemplate {...props} />);
}; 