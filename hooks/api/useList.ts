import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addQuestionToList,
  createQuestionList,
  deleteQuestionList,
  getQuestionList,
  getQuestionLists,
  removeQuestionFromList,
} from '@/api/list';
import { UserId, UserListId, AuthorizedApiRequest } from '@/shapes';

export function useList(props: AuthorizedApiRequest<UserListId>) {
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

export function useDeleteList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteQuestionList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
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
