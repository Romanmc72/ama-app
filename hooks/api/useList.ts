import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addQuestionToList,
  createQuestionList,
  deleteQuestionList,
  getQuestionFromList,
  getQuestionList,
  getQuestionLists,
  ListQuestionId,
  removeQuestionFromList,
  updateQuestionList,
} from '@/api/list';
import { UserId, UserListId, AuthorizedApiRequest } from '@/shapes';
import { FetchQuestionsProps } from '@/api/question';

export function useList(props: AuthorizedApiRequest<UserListId & FetchQuestionsProps>) {
  return useQuery({
    queryKey: ['lists', props.listId],
    queryFn: () => getQuestionList(props),
  });
}

export function useLists(props: AuthorizedApiRequest<UserId>) {
  return useQuery({
    queryKey: ['lists'],
    queryFn: () => getQuestionLists(props),
  });
}

export function useCreateList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createQuestionList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });
}

export function useUpdateList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateQuestionList,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['lists', variables.listId] });
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });
}

export function useDeleteList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteQuestionList,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      queryClient.cancelQueries({ queryKey: ['lists', variables.listId] });
    },
  });
}

export function useListQuestion(props: AuthorizedApiRequest<ListQuestionId>) {
  return useQuery({
    queryKey: ['lists', props.listId],
    queryFn: () => getQuestionFromList(props),
  });
}

export function useAddQuestionToList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addQuestionToList,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['lists', variables.listId] });
    },
  });
}

export function useRemoveQuestionFromList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeQuestionFromList,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['list', variables.listId] });
    },
  });
}
