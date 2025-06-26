import { ColorScheme } from '@/constants/Colors';
import { Subscription } from './subscription';
import { ListId } from './list';

/** The settings related to how the user accesses the app. */
export type UserSettings = {
  /** The user's color preferences. */
  colorScheme: 'default' | ColorScheme;
};

/** The properties required to get a user. */
export interface UserId {
  /** The unique user identifier. */
  userId: string;
}

/** The shape of the user's data. */
export type UserBase = {
  /** The user's name. */
  name: string;
  /** Their subscription configuration. */
  subscription: Subscription;
  /** Any settings this user has saved. */
  settings: UserSettings;
  /** The lists that this user has created. */
  lists: ListId[];
};

export type User = UserBase & UserId;
