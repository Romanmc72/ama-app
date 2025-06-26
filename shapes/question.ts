/** The base properties for a question. */
export type QuestionBase = {
  /** The question itself. */
  prompt: string;
  /** The tags that describe the question. */
  tags: string[];
};

/** Just the question identifier. */
export type QuestionId = {
  /** The unique identifier for the question. */
  questionId: string;
};

/** A fully formed question. */
export type Question = QuestionBase & QuestionId;
