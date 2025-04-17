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
      console.log('url', url);
      const absoluteUrl = url.startsWith('http') ? url : `http://${process.env.MACHINE_IP}${url.startsWith('/') ? '' : '/'}${url}`;
      const updatedUrl = absoluteUrl.replace('localhost', process.env.MACHINE_IP);
      console.log('updatedUrl', updatedUrl);
      const _url = new URL(updatedUrl);
      const data = new FormData();
      if (pdfFormat) {
        data.append('pdfFormat', pdfFormat);
      }
      data.append('remoteURL', _url.href);

      if (properties) {
        ConverterUtils.injectPageProperties(data, properties);
      }
      const result = await GotenbergUtils.fetch(this.endpoint, data);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
