export interface SubscriptionPayload {
  lemonSqueezyId?: string;
}

// Add this console.log to help with debugging
console.log('[DEBUG] SubscriptionPayload interface defines lemonSqueezyId (not lemonSubscriptionId)');

export enum SubscriptionPaymentStatus {
  Succeed = 'succeed',
  Failed = 'failed',
}
