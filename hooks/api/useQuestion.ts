import { FetchQuestionProps } from '@/api/question';
import { apiClient } from './client';

/**
 * Custom hook to fetch a random question.
 */
export function useQuestion({
  questionId,
  random = false,
  finalId = '',
  tags,
}: FetchQuestionProps) {
  if (questionId) {
    return apiClient.useQuery('get', '/question/{questionId}', {
      params: { path: { questionId } },
    });
  }
  const { data, ...everythingElse } = apiClient.useQuery('get', '/question', {
    params: { query: { finalId, limit: 1, random, tag: tags } },
  });
  if (data && data.length) {
    return { data: data[0], ...everythingElse };
  }
  return { data: undefined, ...everythingElse };
}
