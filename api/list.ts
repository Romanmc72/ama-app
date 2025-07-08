import { List, ListBase, UserId, QuestionId, UserListId, ListWithQuestions } from '@/shapes';
import { hitApi, join } from './base';

/** The path for interacting with one specific list. */
const listPath = (ids: UserListId): string => join('users', ids.userId, 'lists', ids.listId);

/** The path for interacting with all of a user's lists. */
const listsPath = (userId: UserId): string => join('users', userId.userId, 'lists');

type ListQuestionId = UserListId & QuestionId;

/** The path for interacting with all of a user's lists. */
const listQuestionPath = (props: ListQuestionId): string =>
  join('users', props.userId, 'lists', props.listId, props.questionId);

/**
 * Retrieves a specific question list.
 * @param props the properties required to fetch a specific list.
 * @return the list requested.
 */
export async function getQuestionList(props: UserListId): Promise<ListWithQuestions> {
  return await hitApi({ path: listPath(props) });
}

/**
 * Get all question lists for a user.
 * @param props the user to get lists for.
 * @returns the lists they have.
 */
export async function getQuestionLists(props: UserId): Promise<List[]> {
  return await hitApi({ path: listsPath(props) });
}

/** The properties required to create a new question list. */
export type CreateQuestionListProps = UserId & ListBase;

/**
 * Creates a new question list for a user.
 * @param props The user and the list properties.
 * @returns the created list.
 */
export async function createQuestionList(props: CreateQuestionListProps): Promise<List> {
  const { userId, ...listProps } = props;
  return await hitApi({ path: listsPath({ userId }), method: 'POST', body: listProps });
}

/**
 * Deletes a question list from a user.
 * @param props the question list to delete.
 * @returns Nothing, this is safe to rerun as deleting
 * an already deleted list does nothing.
 */
export async function deleteQuestionList(props: UserListId): Promise<void> {
  return await hitApi({ path: listPath(props), method: 'DELETE' });
}

/**
 * Add a question to a list.
 * @param props The list to add the question to.
 * @param question The question to add.
 * @returns The new state of the list.
 */
export async function addQuestionToList(props: ListQuestionId): Promise<void> {
  return await hitApi({ path: listQuestionPath(props), method: 'POST' });
}

/**
 * Removes 1 question from a list of questions.
 * @param props the list the question exists in.
 * @param questionId the question id that needs removing.
 * @returns Nothing.
 */
export async function removeQuestionFromList(props: ListQuestionId): Promise<void> {
  return await hitApi({ path: listQuestionPath(props), method: 'DELETE' });
}
