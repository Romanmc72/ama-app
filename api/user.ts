import { User, UserId } from '@/shapes';

/**
 * Retrieve user data from the backend.
 * @param props The properties required to get a specific user's data.
 * @returns The promise containing the user data fetched.
 */
export async function getUser(props: UserId): Promise<User> {
  return Promise.resolve({
    id: props.id,
    name: 'john doe',
    subscription: {
      tier: 'free',
      payCadence: 'monthly',
      renewalDate: new Date(),
    },
    settings: {
      colorScheme: 'default',
    },
  });
}
