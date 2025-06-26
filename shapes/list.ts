import { Question } from './question';

/** The object with a list's unique id in it. */
export type ListId = {
  /** The unique identifier for the list. */
  listId: string;
};

/** The base list object. */
export type ListBase = {
  /** The name of a list of questions. */
  name: string;
};

/** A question list. */
export type List = ListId & ListBase;

/** A list with the list's questions in it. */
export type ListWithQuestions = List & {
  /** The list information. */
  list: List;
  /** The questions in the list. */
  questions: Question[];
};
