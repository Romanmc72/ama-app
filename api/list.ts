import {
  AuthorizedApiRequest,
  List,
  ListBase,
  UserId,
  QuestionId,
  UserListId,
  ListWithQuestions,
} from '@/shapes';
import { hitApi, join } from './base';

/** The path for interacting with one specific list. */
const listPath = (ids: UserListId): string => join('user', ids.userId, 'list', ids.listId);

/** The path for interacting with all of a user's lists. */
const listsPath = (userId: UserId): string => join('user', userId.userId, 'list');

type ListQuestionId = UserListId & QuestionId;

/** The path for interacting with all of a user's lists. */
const listQuestionPath = (props: ListQuestionId): string =>
  join('user', props.userId, 'list', props.listId, 'question', props.questionId);

/**
 * Retrieves a specific question list.
 * @param props the properties required to fetch a specific list.
 * @return the list requested.
 */
export async function getQuestionList({
  idToken,
  ...props
}: AuthorizedApiRequest<UserListId>): Promise<ListWithQuestions> {
  if (!props.userId || props.userId === '' || !props.listId || props.listId === '')
    throw new Error('Invalid list id / user id provided.');
  return await hitApi({ path: listPath(props), idToken });
}

/**
 * Get all question lists for a user.
 * @param props the user to get lists for.
 * @returns the lists they have.
 */
export async function getQuestionLists({
  idToken,
  ...props
}: AuthorizedApiRequest<UserId>): Promise<List[]> {
  return await hitApi({ path: listsPath(props), idToken });
}

/** The properties required to create a new question list. */
export type CreateQuestionListProps = UserId & ListBase;

/**
 * Creates a new question list for a user.
 * @param props The user and the list properties.
 * @returns the created list.
 */
export async function createQuestionList({
  userId,
  idToken,
  ...body
}: AuthorizedApiRequest<CreateQuestionListProps>): Promise<List> {
  return await hitApi({ path: listsPath({ userId }), method: 'POST', body, idToken });
}

/**
 * Deletes a question list from a user.
 * @param props the question list to delete.
 * @returns Nothing, this is safe to rerun as deleting
 * an already deleted list does nothing.
 */
export async function deleteQuestionList({
  idToken,
  ...props
}: AuthorizedApiRequest<UserListId>): Promise<void> {
  if (!props.userId || props.userId === '' || !props.listId || props.listId === '')
    throw new Error('Invalid list id / user id provided.');
  return await hitApi({ path: listPath(props), method: 'DELETE', idToken });
}

/**
 * Add a question to a list.
 * @param props The list to add the question to.
 * @param question The question to add.
 * @returns The new state of the list.
 */
export async function addQuestionToList({
  idToken,
  ...props
}: AuthorizedApiRequest<ListQuestionId>): Promise<void> {
  if (
    !props.userId ||
    props.userId === '' ||
    !props.listId ||
    props.listId === '' ||
    !props.questionId ||
    props.questionId === ''
  )
    throw new Error('Invalid list id / user id / question id provided.');
  return await hitApi({ path: listQuestionPath(props), method: 'POST', idToken });
}

/**
 * Removes 1 question from a list of questions.
 * @param props the list the question exists in.
 * @param questionId the question id that needs removing.
 * @returns Nothing.
 */
export async function removeQuestionFromList({
  idToken,
  ...props
}: AuthorizedApiRequest<ListQuestionId>): Promise<void> {
  if (
    !props.userId ||
    props.userId === '' ||
    !props.listId ||
    props.listId === '' ||
    !props.questionId ||
    props.questionId === ''
  )
    throw new Error('Invalid list id / user id / question id provided.');
  return await hitApi({ path: listQuestionPath(props), method: 'DELETE', idToken });
}
