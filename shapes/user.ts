import { ColorScheme } from '@/constants/Colors';
import { Subscription } from './subscription';
import { ListId } from './list';

/** The settings related to how the user accesses the app. */
export type UserSettings = {
  /** The user's color preferences. */
  colorScheme: ColorScheme;
};

/** The properties required to get a user. */
export interface UserId {
  /** The unique user identifier. */
  userId: string;
}

/** The shape of the user's data. */
export type UserBase = {
  /** The user's unique identifier from firebase. */
  firebaseId: string;
  /** The user's name. */
  name: string;
  /** The user's email. */
  email: string;
  /**
   * Whether the subscription is free or paid, and if paid what tier.
   */
  tier: 'free' | 'lite' | 'premium';
  /** Their subscription configuration. */
  subscription: Subscription;
  /** Any settings this user has saved. */
  settings: UserSettings;
  /** The lists that this user has created. */
  lists: (ListId & { name: string })[];
};

export type User = UserBase & UserId;

export type LogInProps = { email: string; password: string } | undefined;

export type UserCreateProps = Omit<UserBase & LogInProps, 'firebaseId'>;
