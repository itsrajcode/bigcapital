import { InvoicePaperTemplateProps } from "../components/InvoicePaperTemplate";
import {
  MinimalInvoiceTemplate,
} from "../components/MinimalBasicTemplate";
import { renderSSR } from "./render-ssr";

export const renderMinimalBasicTemplateHtml = (
  props: InvoicePaperTemplateProps
) => {
  return renderSSR(<MinimalInvoiceTemplate {...props} />);
};
