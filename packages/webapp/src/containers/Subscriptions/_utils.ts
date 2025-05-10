// @ts-nocheck
export const getSubscriptionStatusText = (subscription) => {
  if (subscription.status === 'on_trial') {
    // Handle both camelCase and snake_case
    const trialEndsDate = subscription.trialEndsAtFormatted || subscription.trial_ends_at_formatted;
    return (subscription.onTrial || subscription.on_trial)
      ? `Trials ends on ${trialEndsDate}`
      : `Trial ended ${trialEndsDate}`;
  } else if (subscription.status === 'active') {
    // Check both snake_case and camelCase versions of the property
    // Also check the raw ends_at if formatted version is not available
    const endsDate = subscription.endsAtFormatted || 
                     subscription.ends_at_formatted || 
                     (subscription.ends_at ? new Date(subscription.ends_at).toLocaleDateString() : null);
    
    return endsDate
      ? `Renews on ${endsDate}`
      : 'Lifetime subscription';
  } else if (subscription.status === 'canceled') {
    const endsDate = subscription.endsAtFormatted || 
                     subscription.ends_at_formatted || 
                     (subscription.ends_at ? new Date(subscription.ends_at).toLocaleDateString() : null);
    
    return subscription.ended
      ? `Expires on ${endsDate}`
      : `Expired on ${endsDate}`;
  }
  return '';
};
