import { Question, QuestionBase, QuestionId } from '@/shapes';
import { convertPropsToQueryParams, hitApi } from './base';

const path = 'questions';

/** The properties required to fetch multiple questions. */
export interface FetchQuestionsProps {
  /** The identifier of the previous question fetched. */
  finalId?: string;
  /** */
  limit?: number;
  /** The tags to find matching questions for. */
  ags?: string[];
}

/**
 * Grabs a question from the database.
 * @param props The properties to grab the question.
 * @returns The fetched question.
 */
export async function fetchQuestions(props: FetchQuestionsProps): Promise<Question[]> {
  const params = convertPropsToQueryParams(props);
  return await hitApi<Question[], undefined>({ params, path });
}

/**
 * Properties to fetch just one question whether by id or by a series of properties.
 */
export interface FetchQuestionProps
  extends Partial<QuestionId>,
    Partial<Omit<FetchQuestionsProps, 'limit'>> {}

/**
 * Gets either one random question or the exact question that you request using
 * its id. If the id is provided all other filters are ignored and if it is not
 * provided all other filters are used.
 * @param props The properties describing the question to fetch.
 * @returns One question
 */
export async function fetchQuestion(props: FetchQuestionProps): Promise<Question> {
  if (props.id) {
    return await hitApi<Question, undefined>({ path: [path, props.id].join('/') });
  }
  const params = convertPropsToQueryParams(props);
  params.set('limit', '1');
  const questions = await hitApi<Question[], undefined>({ path, params });
  if (questions.length) {
    return questions[0];
  }
  throw new Error('No question was found at this time.');
}

/**
 * Creates a new question.
 * @param props The question to create.
 * @returns The created question.
 */
export async function createQuestion(props: QuestionBase): Promise<Question> {
  return await hitApi<Question, QuestionBase>({ method: 'POST', path, body: props });
}

/**
 * Deletes a question.
 * @param props The question id to be deleted.
 */
export async function deleteQuestion(props: QuestionId): Promise<void> {
  await hitApi({ method: 'DELETE', path: [path, props.id].join('/') });
}
