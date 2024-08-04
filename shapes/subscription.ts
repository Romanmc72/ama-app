/**
 * The shape defining the users subscription to the app.
 */
export type Subscription = {
  /**
   * Whether the subscription is free or paid, and if paid what tier.
   */
  tier: 'free' | 'lite' | 'premium';
  /**
   * The cadence at which the user's subscription renews.
   */
  payCadence: 'monthly';
  /**
   * The date upon which the user's subscription renews.
   */
  renewalDate: Date;
};
