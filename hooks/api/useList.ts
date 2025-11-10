import { useQueryClient } from '@tanstack/react-query';
import { apiClient } from './client';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

export function useList(listId: string) {
  const user = auth.currentUser;
  return apiClient.useQuery(
    'get',
    '/user/{userId}/list/{listId}',
    { params: { path: { userId: user?.uid ?? '', listId } } },
    { enabled: !!user },
  );
}

export function useLists() {
  const user = auth.currentUser;
  return apiClient.useQuery(
    'get',
    '/user/{userId}/list',
    { params: { path: { userId: user?.uid ?? '' } } },
    { enabled: !!user },
  );
}

export function useCreateList() {
  const user = auth.currentUser;
  const queryClient = useQueryClient();
  const m = apiClient.useMutation('post', '/user/{userId}/list', {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['get', '/user/{userId}/list'] });
      queryClient.invalidateQueries({ queryKey: ['get', '/user'] });
    },
  });
  if (!user) {
    return () => {};
  }
  return (name: string) => m.mutate({ params: { path: { userId: user.uid } }, body: { name } });
}

export function useUpdateList() {
  const user = auth.currentUser;
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
  if (!user) {
    return () => {};
  }
  return (listId: string, name: string) =>
    m.mutate({ params: { path: { userId: user.uid, listId } }, body: { name } });
}

export function useDeleteList() {
  const user = auth.currentUser;
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
  if (!user) {
    return () => {};
  }
  return (listId: string) => m.mutate({ params: { path: { userId: user.uid, listId } } });
}

export function useListQuestion(listId: string, questionId: string) {
  const user = auth.currentUser;
  return apiClient.useQuery(
    'get',
    '/user/{userId}/list/{listId}/question/{questionId}',
    { params: { path: { userId: user?.uid ?? '', listId, questionId } } },
    { enabled: !!user, retry: false },
  );
}

export function useAddQuestionToList() {
  const user = auth.currentUser;
  const queryClient = useQueryClient();
  const m = apiClient.useMutation('post', '/user/{userId}/list/{listId}/question/{questionId}');
  if (!user) {
    return () => {};
  }
  return (listId: string, questionId: string) =>
    m.mutate(
      { params: { path: { userId: user.uid, listId, questionId } } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['get', '/user/{userId}/list/{listId}'] });
        },
      },
    );
}

export function useRemoveQuestionFromList() {
  const user = auth.currentUser;
  const queryClient = useQueryClient();
  const m = apiClient.useMutation('delete', '/user/{userId}/list/{listId}/question/{questionId}');
  if (!user) {
    return () => {};
  }
  return (listId: string, questionId: string) =>
    m.mutate(
      { params: { path: { userId: user.uid, listId, questionId } } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['get', '/user/{userId}/list/{listId}'] });
          queryClient.invalidateQueries({
            queryKey: [
              'get',
              '/user/{userId}/list/{listId}/question/{questionId}',
              { params: { path: { userId: user.uid, listId, questionId } } },
            ],
          });
        },
      },
    );
}
