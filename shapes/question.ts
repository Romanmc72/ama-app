/** The base properties for a question. */
export type QuestionBase = {
  /** The question itself. */
  prompt: string;
  /** The tags that describe the question. */
  tags: QuestionTagKey[];
};

/** Just the question identifier. */
export type QuestionId = {
  /** The unique identifier for the question. */
  questionId: string;
};

/** A fully formed question. */
export type Question = QuestionBase & QuestionId;

/**
 * The list of question tags that exist to query.
 */
export const QuestionTag = {
  TEST: 'test',
  RELIGION: 'religion',
  NSFW: 'nsfw',
  PHILOSOPHY: 'philosophy',
  LIFE: 'life',
  DEEP: 'deep',
  FUN: 'fun',
  RANDOM: 'random',
  PERSONAL: 'personal',
  INTROSPECTIVE: 'introspective',
} as const;

/** The keys from the question tag list. */
export type QuestionTagKey = (typeof QuestionTag)[keyof typeof QuestionTag];
