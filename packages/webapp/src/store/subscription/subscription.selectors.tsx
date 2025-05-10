// @ts-nocheck
import { createSelector } from '@reduxjs/toolkit';
import { includes } from 'lodash';

// This remains unexported and is specific in its signature (state, props)
const subscriptionSelectorInternal = (slug) => (state, props) => {
  const subscriptions = Object.values(state.subscriptions.data);
  return subscriptions.find(
    (subscription) => subscription.slug === (slug || props.subscriptionType),
  );
};

const subscriptionsSelector = (state, props) => {
  const subscriptions = Object.values(state.subscriptions.data);
  return subscriptions.filter(
    (subscription) =>
      includes(props.subscriptionTypes, subscription.slug) ||
      !props.subscriptionTypes,
  );
};

// Corrected getSubscriptionFactory
export const getSubscriptionFactory = (slug) => 
  createSelector(
    (state) => state.subscriptions.data, // Input selector: gets all subscriptions data
    (subscriptionsData) => { // Combiner function
      if (!subscriptionsData) return null;
      const subscriptions = Object.values(subscriptionsData);
      return subscriptions.find(sub => sub.slug === slug) || null;
    }
  );

export const isSubscriptionOnTrialFactory = (slug) =>
  createSelector(
    getSubscriptionFactory(slug),
    (subscription) => {
      // Handle both onTrial (camelCase) and on_trial (snake_case) property names
      // Also check status which could be 'on_trial' (snake_case)
      return subscription?.status === 'on_trial' || 
             subscription?.onTrial === true || 
             subscription?.on_trial === true;
    }
  );

export const isSubscriptionActiveFactory = (slug) =>
  createSelector(
    getSubscriptionFactory(slug),
    (subscription) => {
      // Check active status and properties
      return subscription?.status === 'active' || 
             subscription?.active === true;
    }
  );

export const isSubscriptionInactiveFactory = (slug) =>
  createSelector(
    getSubscriptionFactory(slug), // Use the new factory
    (subscription) => subscription?.status === 'inactive' || !subscription,
  );

// These selectors take props, so their internal logic might differ or need to be adjusted
// For now, focusing on the ones using a simple slug

export const isSubscriptionsInactiveFactory = () =>
  createSelector(subscriptionsSelector, (subscriptions) =>
    subscriptions.some((subscription) => subscription?.status === 'inactive'),
  );

export const isSubscriptionsActiveFactory = () =>
  createSelector(subscriptionsSelector, (subscriptions) =>
    subscriptions.some((subscription) => subscription?.status === 'active'),
  );
