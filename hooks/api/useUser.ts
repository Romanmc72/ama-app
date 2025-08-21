import { createUser, deleteUser, getUser, updateUser } from '@/api/user';
import { UserId, AuthorizedApiRequest } from '@/shapes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// TODO: maybe use the user context to get the userId and idToken or raise errors when that is null (or not provided?)

export function useUser(props: AuthorizedApiRequest<UserId>) {
  return useQuery({
    queryKey: ['user', props.userId],
    queryFn: () => getUser(props),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
    },
  });
}

export function useCreateUser() {
  return useMutation({
    mutationFn: createUser,
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
    },
  });
}
