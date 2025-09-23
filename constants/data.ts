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

/** The UUID for all of the "Liked Question List"s that every user has. */
export const LIKED_QUESTION_LIST_ID = '84e37c9a-3ff3-4643-82fd-49977fb35fe8';
