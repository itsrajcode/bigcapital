import { Service } from 'typedi';
import { createCheckout, getStore, getVariant } from '@lemonsqueezy/lemonsqueezy.js';
import { SystemUser } from '@/system/models';
import { configureLemonSqueezy } from './utils';
import config from '@/config';

@Service()
export class LemonSqueezyService {
  /**
   * Retrieves the LemonSqueezy checkout url.
   * @param {number} variantId
   * @param {SystemUser} user
   */
  async getCheckout(variantId: number, user: SystemUser) {
    configureLemonSqueezy();
  
    // const { statusCode, error, data } = await getVariant(variantId, {
    //   include: ['product'],
    // });
    // console.log('data', error);
    
    console.log(variantId)
     const { data: storeData } = await getStore(156508, { include: ['products'] });
     console.log('storeData', storeData);
    return createCheckout(process.env.LEMONSQUEEZY_STORE_ID!, 702753, {
      checkoutOptions: {
        embed: true,
        media: true,
        logo: true,
      },
      checkoutData: {
        email: user.email,
        custom: {
          user_id: user.id + '',
          tenant_id: user.tenantId + '',
        },
      },
      productOptions: {
        enabledVariants: [variantId],
        redirectUrl: config.lemonSqueezy.redirectTo,
        receiptButtonText: 'Go to Dashboard',
        receiptThankYouNote: 'Thank you for signing up to Lemon Stand!',
      },
    });
  }
}
