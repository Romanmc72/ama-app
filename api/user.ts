import { User, UserBase, UserId } from '@/shapes';
import { hitApi, join } from './base';

const path = 'users';

/**
 * Retrieve user data from the backend.
 * @param props The properties required to get a specific user's data.
 * @returns The promise containing the user data fetched.
 */
export async function getUser(props: UserId): Promise<User> {
  return await hitApi({ path: join(path, props.id) });
}

/**
 * Update a user's data using this endpoint. This is safe to be rerun over and
 * over again with the same inputs. It will however cause an error if the
 * requested user id does not currently exist.
 * @param props The user to update and their updated information.
 * @returns The updated user object.
 */
export async function updateUser(props: User): Promise<User> {
  return await hitApi({ path: join(path, props.id), body: props, method: 'PUT' });
}

/**
 * Create a new user on the backend. This action can only be run once given a
 * unique set of fields such as the user's email. If given the same inputs
 * again this endpoint will throw an error as the user already exists.
 * @param props The data for the user minus their id.
 * @returns The created user with a user id.
 */
export async function createUser(props: UserBase): Promise<User> {
  return await hitApi({ path, body: props, method: 'POST' });
}

/**
 * Delete a user from the backend. This action is irreversible and idempotent.
 * It is safe to be rerun over and over but will have no effect if rerun given
 * the same inputs.
 * @param props The user id to delete.
 * @returns Nothing.
 */
export async function deleteUser(props: UserId): Promise<void> {
  return await hitApi({ path: join(path, props.id), method: 'DELETE' });
}
