import { Inject, Service } from 'typedi';
import { NotAllowedChangeSubscriptionPlan, ServiceError } from '@/exceptions';
import { Plan, PlanSubscription, Tenant } from '@/system/models';
import { EventPublisher } from '@/lib/EventPublisher/EventPublisher';
import events from '@/subscribers/events';
import { SubscriptionPayload, SubscriptionPaymentStatus } from '@/interfaces';
import { ERRORS } from './types';

@Service()
export class Subscription {
  @Inject()
  private eventPublisher: EventPublisher;

  /**
   * Give the tenant a new subscription.
   * @param {number} tenantId - Tenant id.
   * @param {string} planSlug - Plan slug of the new subscription.
   * @param {string} subscriptionSlug - Subscription slug by default takes main subscription
   * @param {SubscriptionPayload} payload - Subscription payload.
   */
  public async newSubscribtion(
    tenantId: number,
    planSlug: string,
    subscriptionSlug: string = 'main',
    payload?: SubscriptionPayload
  ): Promise<void> {
    console.log('[DEBUG] newSubscribtion method called with:');
    console.log('[DEBUG] - tenantId:', tenantId);
    console.log('[DEBUG] - planSlug:', planSlug);
    console.log('[DEBUG] - subscriptionSlug:', subscriptionSlug);
    console.log('[DEBUG] - payload:', JSON.stringify(payload));
    
    try {
    const tenant = await Tenant.query().findById(tenantId).throwIfNotFound();
      console.log('[DEBUG] Tenant found:', tenant.id);
      
    const plan = await Plan.query().findOne('slug', planSlug).throwIfNotFound();
      console.log('[DEBUG] Plan found:', JSON.stringify(plan));

    // Take the invoice interval and period from the given plan.
    const invoiceInterval = plan.invoiceInternal;
    const invoicePeriod = plan.invoicePeriod;
      console.log('[DEBUG] Using invoice interval:', invoiceInterval);
      console.log('[DEBUG] Using invoice period:', invoicePeriod);

    const subscription = await tenant
      .$relatedQuery('subscriptions')
      .modify('subscriptionBySlug', subscriptionSlug)
      .first();
      
      console.log('[DEBUG] Existing subscription found:', subscription ? 'Yes' : 'No');
      if (subscription) {
        console.log('[DEBUG] Subscription status:', subscription.status());
        console.log('[DEBUG] Subscription active:', subscription.active());
      }
      console.log('[DEBUG] Subscription on trial:', subscription);
    // No allowed to re-new the the subscription while the subscription is active.
    if (subscription && subscription.active() && subscription.onTrial() !== true) {
        console.log('[DEBUG] Existing active subscription found. Cancelling it before creating a new one.');
        const now = new Date();
        await subscription.$query().patch({
          canceledAt: now,
          endsAt: now, 
          // Optionally, you might want to set paymentStatus to something like 'superseded'
          // if you add such a status, or just let it be.
          // For now, we will just cancel and end it.
        });
        console.log('[DEBUG] Existing active subscription cancelled and ended. Proceeding to create new subscription.');
        // Proceed to create new subscription (logic copied from the 'else' block)
        console.log('[DEBUG] Creating new subscription after cancelling the old one, with:');
        console.log('[DEBUG] - plan.id:', plan.id);
        console.log('[DEBUG] - invoiceInterval:', invoiceInterval);
        console.log('[DEBUG] - invoicePeriod:', invoicePeriod);
        console.log('[DEBUG] - subscriptionSlug:', subscriptionSlug);
        console.log('[DEBUG] - payload:', JSON.stringify(payload));
        
        try {
          if (payload) {
            console.log('[DEBUG] LemonSqueezyId in payload for new subscription:', payload.lemonSqueezyId);
          }
          const result = await tenant.newSubscription(
            plan.id,
            invoiceInterval,
            invoicePeriod,
            subscriptionSlug,
            payload
          );
          console.log('[DEBUG] New subscription created successfully after cancelling old one:', result ? JSON.stringify(result) : 'No result');
        } catch (error) {
          console.error('[ERROR] Failed to create new subscription after cancelling old one:', error);
          throw error;
        }

      // In case there is already subscription associated to the given tenant renew it.
    } else if (subscription && subscription.inactive()) {
        console.log('[DEBUG] Renewing inactive subscription');
        
        // First, update the subscription dates
        await subscription.renew(invoiceInterval, invoicePeriod);
        
        // Then, explicitly set the required fields to ensure proper transition
        const updatedSubscription = await subscription.$query().patch({
          active: true,
          trialEndsAt: null,
          status: 'active',
        });
        // console.table([updatedSubscription, updatedSubscription.active(), updatedSubscription.trialEndsAt(), updatedSubscription.status(), updatedSubscription.onTrial()]);
        
        console.log('[DEBUG] Subscription renewed successfully and activated');

      // No stored past tenant subscriptions create new one.
    } else {
        console.log('[DEBUG] Creating new subscription with:');
        console.log('[DEBUG] - plan.id:', plan.id);
        console.log('[DEBUG] - invoiceInterval:', invoiceInterval);
        console.log('[DEBUG] - invoicePeriod:', invoicePeriod);
        console.log('[DEBUG] - subscriptionSlug:', subscriptionSlug);
        console.log('[DEBUG] - payload:', JSON.stringify(payload));
        
        try {
          // Check what's in the payload
          if (payload) {
            console.log('[DEBUG] LemonSqueezyId in payload:', payload.lemonSqueezyId);
          }
          
          const result = await tenant.newSubscription(
        plan.id,
        invoiceInterval,
        invoicePeriod,
        subscriptionSlug,
        payload
      );
          console.log('[DEBUG] New subscription created:', result ? JSON.stringify(result) : 'No result');
        } catch (error) {
          console.error('[ERROR] Failed to create new subscription:', error);
          throw error;
        }
      }
    } catch (error) {
      console.error('[ERROR] Exception in newSubscribtion method:', error);
      throw error;
    }
  }

  /**
   * Cancels the given tenant subscription.
   * @param {number} tenantId - Tenant id.
   * @param {string} subscriptionSlug - Subscription slug.
   */
  async cancelSubscription(
    tenantId: number,
    subscriptionSlug: string = 'main'
  ): Promise<void> {
    const tenant = await Tenant.query().findById(tenantId).throwIfNotFound();

    const subscription = await PlanSubscription.query().findOne({
      tenantId,
      slug: subscriptionSlug,
    });
    // Throw error early if the subscription is not exist.
    if (!subscription) {
      throw new ServiceError(ERRORS.SUBSCRIPTION_NOT_EXIST);
    }
    // Throw error early if the subscription is already canceled.
    if (subscription.canceled()) {
      throw new ServiceError(ERRORS.SUBSCRIPTION_ALREADY_CANCELED);
    }
    await subscription.$query().patch({ canceledAt: new Date() });

    // Triggers `onSubscriptionCancelled` event.
    await this.eventPublisher.emitAsync(
      events.subscription.onSubscriptionCancelled,
      {
        tenantId,
        subscriptionSlug,
      }
    );
  }

  /**
   * Resumes the given tenant subscription.
   * @param {number} tenantId
   * @param {string} subscriptionSlug  - Subscription slug by deafult main subscription.
   * @returns {Promise<void>}
   */
  async resumeSubscription(
    tenantId: number,
    subscriptionSlug: string = 'main'
  ) {
    const tenant = await Tenant.query().findById(tenantId).throwIfNotFound();

    const subscription = await PlanSubscription.query().findOne({
      tenantId,
      slug: subscriptionSlug,
    });
    // Throw error early if the subscription is not exist.
    if (!subscription) {
      throw new ServiceError(ERRORS.SUBSCRIPTION_NOT_EXIST);
    }
    // Throw error early if the subscription is not cancelled.
    if (!subscription.canceled()) {
      throw new ServiceError(ERRORS.SUBSCRIPTION_ALREADY_ACTIVE);
    }
    await subscription.$query().patch({ canceledAt: null });

    // Triggers `onSubscriptionResumed` event.
    await this.eventPublisher.emitAsync(
      events.subscription.onSubscriptionResumed,
      { tenantId, subscriptionSlug }
    );
  }

  /**
   * Mark the given subscription payment of the tenant as succeed.
   * @param {number} tenantId
   * @param {string} newPlanSlug
   * @param {string} subscriptionSlug
   */
  async subscriptionPlanChanged(
    tenantId: number,
    newPlanSlug: string,
    subscriptionSlug: string = 'main'
  ): Promise<void> {
    const tenant = await Tenant.query().findById(tenantId).throwIfNotFound();
    const newPlan = await Plan.query()
      .findOne('slug', newPlanSlug)
      .throwIfNotFound();

    const subscription = await PlanSubscription.query().findOne({
      tenantId,
      slug: subscriptionSlug,
    });
    if (subscription.planId === newPlan.id) {
      throw new ServiceError('');
    }
    await subscription.$query().patch({ planId: newPlan.id });

    // Triggers `onSubscriptionPlanChanged` event.
    await this.eventPublisher.emitAsync(
      events.subscription.onSubscriptionPlanChanged,
      {
        tenantId,
        newPlanSlug,
        subscriptionSlug,
      }
    );
  }

  /**
   * Marks the subscription payment as succeed.
   * @param {number} tenantId - Tenant id.
   * @param {string} subscriptionSlug - Given subscription slug by default main subscription.
   * @returns {Promise<void>}
   */
  async markSubscriptionPaymentSucceed(
    tenantId: number,
    subscriptionSlug: string = 'main'
  ): Promise<void> {
    const subscription = await PlanSubscription.query()
      .findOne({ tenantId, slug: subscriptionSlug })
      .throwIfNotFound();

    await subscription
      .$query()
      .patch({ paymentStatus: SubscriptionPaymentStatus.Succeed });

    // Triggers `onSubscriptionSucceed` event.
    await this.eventPublisher.emitAsync(
      events.subscription.onSubscriptionPaymentSucceed,
      {
        tenantId,
        subscriptionSlug,
      }
    );
  }

  /**
   * Marks the given subscription payment of the tenant as failed.
   * @param {number} tenantId - Tenant id.
   * @param {string} subscriptionSlug - Given subscription slug.
   * @returns {Prmise<void>}
   */
  async markSubscriptionPaymentFailed(
    tenantId: number,
    subscriptionSlug: string = 'main'
  ): Promise<void> {
    const subscription = await PlanSubscription.query()
      .findOne({ tenantId, slug: subscriptionSlug })
      .throwIfNotFound();

    await subscription
      .$query()
      .patch({ paymentStatus: SubscriptionPaymentStatus.Failed });

    // Triggers `onSubscriptionPaymentFailed` event.
    await this.eventPublisher.emitAsync(
      events.subscription.onSubscriptionPaymentFailed,
      {
        tenantId,
        subscriptionSlug,
      }
    );
  }
}
