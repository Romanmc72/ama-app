import { createUser, getUser, updateUser } from '@/api/user';
import { UserId } from '@/shapes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useUser(props: UserId) {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(props),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useCreateUser() {
  return useMutation({
    mutationFn: createUser,
  });
}
