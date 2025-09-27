import { useEffect } from 'react';
import { Edit, Shuffle, ThemedText, ThemedView } from '@/components';
import { viewStyles } from '@/styles/view';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useList } from '@/hooks/api/useList';
import { useUserContext } from '@/contexts';

export default function ListPage() {
  const { listId }: { listId: string } = useLocalSearchParams();
  const { user, idToken } = useUserContext();
  const router = useRouter();
  const { data, isLoading, refetch } = useList({
    userId: user?.userId ?? '',
    listId,
    idToken: idToken ?? '',
    random: false,
    limit: undefined,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <ThemedView style={viewStyles.view}>
        <ThemedText type="title">Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={viewStyles.view}>
      <Stack.Screen options={{ title: data?.list?.name ?? '<No Name>' }} />
      <ThemedText type="title">{data?.list?.name ?? '<No Name>'}</ThemedText>
      <Shuffle onPress={() => router.push(`/list/${listId}/shuffle`)} />
      <Edit onPress={() => router.push(`/list/${listId}/edit`)} />
    </ThemedView>
  );
}
