/**
 * The shape defining the users subscription to the app.
 */
export type Subscription = {
  /**
   * The cadence at which the user's subscription renews.
   */
  payCadence: 'monthly';
  /**
   * The date upon which the user's subscription renews.
   */
  renewalDate: Date;
};
