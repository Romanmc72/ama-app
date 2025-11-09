import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addQuestionToList,
  getQuestionFromList,
  ListQuestionId,
  removeQuestionFromList,
} from '@/api/list';
import { AuthorizedApiRequest } from '@/shapes';
import { questionQueryKey } from './useQuestion';
import { apiClient } from './client';

export const listQueryKey = 'list';

export function useList(userId: string, listId: string) {
  return apiClient.useQuery('get', '/user/{userId}/list/{listId}', {
    params: { path: { userId, listId } },
  });
}

export function useLists(userId: string) {
  return apiClient.useQuery('get', '/user/{userId}/list', {
    params: { path: { userId } },
  });
}

export function useCreateList() {
  const queryClient = useQueryClient();
  const m = apiClient.useMutation('post', '/user/{userId}/list', {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['get', '/user/{userId}/list'] });
      queryClient.invalidateQueries({ queryKey: ['get', '/user'] });
    },
  });
  return (userId: string, name: string) =>
    m.mutate({ params: { path: { userId } }, body: { name } });
}

export function useUpdateList() {
  const queryClient = useQueryClient();
  const m = apiClient.useMutation('put', '/user/{userId}/list/{listId}', {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['get', '/user/{userId}/list/{listId}', variables.params.path],
      });
      queryClient.invalidateQueries({ queryKey: ['get', '/user/{userId}/list'] });
      queryClient.invalidateQueries({ queryKey: ['get', '/user'] });
    },
  });
  return (userId: string, listId: string, name: string) =>
    m.mutate({ params: { path: { userId, listId } }, body: { name } });
}

export function useDeleteList() {
  const queryClient = useQueryClient();
  const m = apiClient.useMutation('delete', '/user/{userId}/list/{listId}', {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['get', '/user/{userId}/list/{listId}', variables.params.path],
      });
      queryClient.invalidateQueries({ queryKey: ['get', '/user/{userId}/list'] });
      queryClient.invalidateQueries({ queryKey: ['get', '/user'] });
    },
  });
  return (userId: string, listId: string) => m.mutate({ params: { path: { userId, listId } } });
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
