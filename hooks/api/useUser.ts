import { useQueryClient } from '@tanstack/react-query';
import { getAuth } from 'firebase/auth';
import { apiClient } from './client';
import { type components } from '@/generated/api';

const auth = getAuth();

export function useUser() {
  const user = auth.currentUser;
  return apiClient.useQuery(
    'get',
    '/user/{userId}',
    { params: { path: { userId: user?.uid ?? '' } } },
    { enabled: !!user },
  );
}

export function useUpdateUser() {
  const user = auth.currentUser;
  const queryClient = useQueryClient();
  const m = apiClient.useMutation('put', '/user/{userId}');
  if (!user) {
    return () => {};
  }
  return (userData: components['schemas']['user.BaseUser']) =>
    m.mutate(
      {
        params: {
          path: { userId: user.uid },
        },
        body: userData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['get', '/user/{userId}'] });
        },
      },
    );
}

export function useCreateUser() {
  const m = apiClient.useMutation('post', '/user');
  return (userData: components['schemas']['user.BaseUser']) => m.mutate({ body: userData });
}

export function useDeleteUser() {
  const user = auth.currentUser;
  const queryClient = useQueryClient();
  const m = apiClient.useMutation('delete', '/user/{userId}');
  if (!user) {
    return () => {};
  }
  return () =>
    m.mutate(
      { params: { path: { userId: user.uid } } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['get', '/user/{userId}'] });
        },
      },
    );
}
