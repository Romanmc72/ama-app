import { ListId } from './list';
import { UserId } from './user';

/** Uniquely identifies a list for a user. */
export type UserListId = UserId & ListId;
