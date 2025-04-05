import FormData from 'form-data';
import { IConverter, PageProperties, PdfFormat, ChromiumRoute } from './_types';
import { ConverterUtils } from './ConvertUtils';
import { Converter } from './Converter';
import { GotenbergUtils } from './GotenbergUtils';

export class UrlConverter extends Converter implements IConverter {
  constructor() {
    super(ChromiumRoute.URL);
  }

  async convert({
    url,
    properties,
    pdfFormat,
  }: {
    url: string;
    properties?: PageProperties;
    pdfFormat?: PdfFormat;
  }): Promise<Buffer> {
    try {
      // Ensure the URL is absolute
      const absoluteUrl = url.startsWith('http') ? url : `http://localhost${url.startsWith('/') ? '' : '/'}${url}`;
      const _url = new URL(absoluteUrl);
      const data = new FormData();

      if (pdfFormat) {
        data.append('pdfFormat', pdfFormat);
      }
      data.append('url', _url.href);

      if (properties) {
        ConverterUtils.injectPageProperties(data, properties);
      }
      return GotenbergUtils.fetch(this.endpoint, data);
    } catch (error) {
      throw error;
    }
  }
}
