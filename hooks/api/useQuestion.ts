import { useQuery } from '@tanstack/react-query';
import { fetchQuestion, FetchQuestionProps } from '@/api/question';

/**
 * Custom hook to fetch a random question.
 */
export function useQuestion(props: FetchQuestionProps) {
  return useQuery({
    queryKey: ['question'],
    queryFn: () => fetchQuestion(props),
  });
}
