import FormData from 'form-data';
import Axios from 'axios';

export class GotenbergUtils {
  public static assert(condition: boolean, message: string): asserts condition {
    if (!condition) {
      throw new Error(message);
    }
  }

  public static async fetch(endpoint: string, data: FormData): Promise<Buffer> {
    console.log('[GotenbergUtils] Fetching from Gotenberg endpoint:', endpoint);
    try {
      const response = await Axios.post("http://localhost:9000/convert/url", data, {
        headers: {
          ...data.getHeaders(),
        },
        responseType: 'arraybuffer', // This ensures you get a Buffer bac
      });
      // console.log('[GotenbergUtils] Gotenberg fetch successful, received buffer length:', response.data?.length);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
