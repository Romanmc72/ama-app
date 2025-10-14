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
import { questionQueryKey } from './useQuestion';

export const listQueryKey = 'list';

export function useList(props: AuthorizedApiRequest<UserListId & FetchQuestionsProps>) {
  return useQuery({
    queryKey: [listQueryKey, props.listId],
    queryFn: () => getQuestionList(props),
  });
}

export function useLists(props: AuthorizedApiRequest<UserId>) {
  return useQuery({
    queryKey: [listQueryKey],
    queryFn: () => getQuestionLists(props),
  });
}

export function useCreateList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createQuestionList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [listQueryKey] });
    },
  });
}

export function useUpdateList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateQuestionList,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [listQueryKey, variables.listId] });
      queryClient.invalidateQueries({ queryKey: [listQueryKey] });
    },
  });
}

export function useDeleteList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteQuestionList,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [listQueryKey] });
      queryClient.cancelQueries({ queryKey: [listQueryKey, variables.listId] });
    },
  });
}

export function useListQuestion(props: AuthorizedApiRequest<ListQuestionId>) {
  return useQuery({
    queryKey: [listQueryKey, props.listId, questionQueryKey, props.questionId],
    queryFn: () => getQuestionFromList(props),
    retry: false,
  });
}

export function useAddQuestionToList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addQuestionToList,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [listQueryKey, variables.listId] });
      queryClient.invalidateQueries({
        queryKey: [listQueryKey, variables.listId, questionQueryKey, variables.questionId],
      });
    },
  });
}

export function useRemoveQuestionFromList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeQuestionFromList,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [listQueryKey, variables.listId] });
      queryClient.invalidateQueries({
        queryKey: [listQueryKey, variables.listId, questionQueryKey, variables.questionId],
      });
    },
  });
}
