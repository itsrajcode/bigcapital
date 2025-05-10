import config from '@/config';
import { Inject, Service } from 'typedi';
import {
  compareSignatures,
  configureLemonSqueezy,
  createHmacSignature,
  webhookHasData,
  webhookHasMeta,
} from './utils';
import { Plan } from '@/system/models';
import { Subscription } from './Subscription';

@Service()
export class LemonSqueezyWebhooks {
  @Inject()
  private subscriptionService: Subscription;

  /**
   * Handles the Lemon Squeezy webhooks.
   * @param {string} rawBody
   * @param {string} signature
   * @returns {Promise<void>}
   */
  public async handlePostWebhook(
    rawData: any,
    data: Record<string, any>,
    signature: string
  ): Promise<void> {
    console.log('[DEBUG] LemonSqueezy Webhook received:', JSON.stringify(data));
    console.log('[DEBUG] Webhook signature:', signature);
    
    configureLemonSqueezy();

    if (!config.lemonSqueezy.webhookSecret) {
      console.error('[ERROR] Lemon Squeezy Webhook Secret not set in .env');
      throw new Error('Lemon Squeezy Webhook Secret not set in .env');
    }
    if (!signature) {
      console.error('[ERROR] Request signature is required.');
      throw new Error('Request signature is required.');
    }
    const secret = config.lemonSqueezy.webhookSecret;
    const hmacSignature = createHmacSignature(secret, rawData);
    console.log('[DEBUG] Computed HMAC signature:', hmacSignature);

    if (!compareSignatures(hmacSignature, signature)) {
      console.error('[ERROR] Invalid webhook signature. Signature mismatch.');
      throw new Error('Invalid signature');
    }
    // Type guard to check if the object has a 'meta' property.
    if (webhookHasMeta(data)) {
      console.log('[DEBUG] Webhook has valid meta property, processing event...');
      // Non-blocking call to process the webhook event.
      void this.processWebhookEvent(data);
    } else {
      console.error('[ERROR] Webhook data invalid, missing meta property.');
      throw new Error('Data invalid');
    }
  }

  /**
   * This action will process a webhook event in the database.
   * @param {unknown} eventBody -
   * @returns {Promise<void>}
   */
  private async processWebhookEvent(eventBody): Promise<void> {
    const webhookEvent = eventBody.meta.event_name;
    console.log('[DEBUG] Processing webhook event:', webhookEvent);

    const userId = eventBody.meta.custom_data?.user_id;
    const tenantId = eventBody.meta.custom_data?.tenant_id;
    const subscriptionSlug = 'main';
    
    console.log('[DEBUG] Webhook user_id:', userId);
    console.log('[DEBUG] Webhook tenant_id:', tenantId);

    if (!webhookHasMeta(eventBody)) {
      console.error('[ERROR] Event body is missing the meta property.');
      throw new Error("Event body is missing the 'meta' property.");
    } else if (webhookHasData(eventBody)) {
      console.log('[DEBUG] Webhook has valid data property.');
      
      if (webhookEvent.startsWith('subscription_payment_')) {
        console.log('[DEBUG] Processing subscription payment event:', webhookEvent);
        // Marks the main subscription payment as succeed.
        if (webhookEvent === 'subscription_payment_success') {
          console.log('[DEBUG] Processing subscription_payment_success event');
          await this.subscriptionService.markSubscriptionPaymentSucceed(
            tenantId,
            subscriptionSlug
          );
          // Marks the main subscription payment as failed.
        } else if (webhookEvent === 'subscription_payment_failed') {
          console.log('[DEBUG] Processing subscription_payment_failed event');
          await this.subscriptionService.markSubscriptionPaymentFailed(
            tenantId,
            subscriptionSlug
          );
        }
        // Save subscription invoices; eventBody is a SubscriptionInvoice
        // Not implemented.
      } else if (webhookEvent.startsWith('subscription_')) {
        console.log('[DEBUG] Processing subscription event:', webhookEvent);
        // Save subscription events; obj is a Subscription
        const attributes = eventBody.data.attributes;
        const variantId = attributes.variant_id as string;
        console.log('[DEBUG] Variant ID from webhook:', variantId);

        // We assume that the Plan table is up to date.
        const plan = await Plan.query().findOne('lemonVariantId', variantId);
        console.log('[DEBUG] Found plan:', plan ? JSON.stringify(plan) : 'No plan found');

        // Update the subscription in the database.
        const priceId = attributes.first_subscription_item.price_id;
        const subscriptionId = eventBody.data.id;
        console.log('[DEBUG] LemonSqueezy subscription ID:', subscriptionId);

        // Throw error early if the given lemon variant id is not associated to any plan.
        if (!plan) {
          console.error(`[ERROR] Plan with variantId ${variantId} not found.`);
          throw new Error(`Plan with variantId ${variantId} not found.`);
        }
        // Create a new subscription of the tenant.
        if (webhookEvent === 'subscription_created') {
          console.log('[DEBUG] Creating new subscription with:');
          console.log('[DEBUG] - tenantId:', tenantId);
          console.log('[DEBUG] - plan slug:', plan.slug);
          console.log('[DEBUG] - subscriptionSlug:', subscriptionSlug);
          console.log('[DEBUG] - lemonSqueezyId:', subscriptionId);
          
          try {
          await this.subscriptionService.newSubscribtion(
            tenantId,
            plan.slug,
            subscriptionSlug,
            { lemonSqueezyId: subscriptionId }
          );
            console.log('[DEBUG] Subscription created successfully');
          } catch (error) {
            console.error('[ERROR] Failed to create subscription:', error);
            throw error;
          }
          // Cancel the given subscription of the organization.
        } else if (webhookEvent === 'subscription_cancelled') {
          console.log('[DEBUG] Cancelling subscription for tenant:', tenantId);
          try {
          await this.subscriptionService.cancelSubscription(
            tenantId,
            subscriptionSlug
          );
            console.log('[DEBUG] Subscription cancelled successfully');
          } catch (error) {
            console.error('[ERROR] Failed to cancel subscription:', error);
            throw error;
          }
        } else if (webhookEvent === 'subscription_plan_changed') {
          console.log('[DEBUG] Changing subscription plan for tenant:', tenantId);
          try {
          await this.subscriptionService.subscriptionPlanChanged(
            tenantId,
            plan.slug,
            subscriptionSlug
          );
            console.log('[DEBUG] Subscription plan changed successfully');
          } catch (error) {
            console.error('[ERROR] Failed to change subscription plan:', error);
            throw error;
          }
        } else if (webhookEvent === 'subscription_resumed') {
          console.log('[DEBUG] Resuming subscription for tenant:', tenantId);
          try {
          await this.subscriptionService.resumeSubscription(
            tenantId,
            subscriptionSlug
          );
            console.log('[DEBUG] Subscription resumed successfully');
          } catch (error) {
            console.error('[ERROR] Failed to resume subscription:', error);
            throw error;
          }
        }
      } else if (webhookEvent.startsWith('order_')) {
        console.log('[DEBUG] Processing order event:', webhookEvent);
        // Save orders; eventBody is a "Order"
        /* Not implemented */
      } else if (webhookEvent.startsWith('license_')) {
        console.log('[DEBUG] Processing license event:', webhookEvent);
        // Save license keys; eventBody is a "License key"
        /* Not implemented */
      }
    } else {
      console.error('[ERROR] Webhook data missing required properties');
    }
  }
}
