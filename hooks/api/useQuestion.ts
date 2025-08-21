import { useQuery } from '@tanstack/react-query';
import { fetchQuestion, FetchQuestionProps } from '@/api/question';
import { AuthorizedApiRequest } from '@/shapes';

/**
 * Custom hook to fetch a random question.
 */
export function useQuestion(props: AuthorizedApiRequest<FetchQuestionProps>) {
  return useQuery({
    queryKey: ['question'],
    queryFn: () => fetchQuestion(props),
  });
}
