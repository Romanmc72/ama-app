import { UserCreateProps } from '@/shapes';

export const DEFAULT_USER_ACCOUNT: Omit<UserCreateProps, 'name' | 'email' | 'password'> = {
  tier: 'free',
  subscription: {
    payCadence: 'monthly',
    renewalDate: new Date(),
  },
  settings: {
    colorScheme: {
      background: 'default',
      foreground: 'default',
      highlightedBackground: 'default',
      highlightedForeground: 'default',
    },
  },
  lists: [],
};
