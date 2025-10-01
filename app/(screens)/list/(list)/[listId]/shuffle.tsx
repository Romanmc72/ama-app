import { useState, useCallback, useEffect } from 'react';
import { Br, Shuffle, ThemedText, ThemedView } from '@/components';
import { viewStyles } from '@/styles/view';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useList } from '@/hooks/api/useList';
import { useUserContext } from '@/contexts';

const buttonDelay = 1000;

export default function ShuffleListPage() {
  const [justPressed, setJustPressed] = useState(false);
  const { listId }: { listId: string } = useLocalSearchParams();
  const { user, idToken } = useUserContext();
  const { data, isFetching, isError, refetch } = useList({
    userId: user?.userId ?? '',
    listId,
    idToken: idToken ?? '',
    random: true,
    limit: 1,
  });
  const title = `${data?.list?.name} - Shuffle`;
  useEffect(() => {
    if (!isError && (data?.questions ?? []).length === 0) {
      refetch();
    }
  }, [isError, data, refetch]);

  const GetQuestionButton = useCallback(() => {
    return (
      <Shuffle
        disabled={isFetching || justPressed}
        onPress={() => {
          console.log('Fetching new question...');
          refetch({ cancelRefetch: true });
          setJustPressed(true);
          setTimeout(() => {
            setJustPressed(false);
          }, buttonDelay);
        }}
      />
    );
  }, [justPressed, isFetching, refetch]);

  if (isError) {
    return (
      <ThemedView style={viewStyles.view}>
        <Stack.Screen options={{ title }} />
        <ThemedView style={{ ...viewStyles.view, width: '80%', minHeight: 'auto', flex: 1 }}>
          <ThemedText type="title">Something went wrong!</ThemedText>
        </ThemedView>
        <Br />
        <ThemedView style={{ ...viewStyles.view, width: '100%', minHeight: 'auto', flex: 1 }}>
          <GetQuestionButton />
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={viewStyles.view}>
      <Stack.Screen options={{ title }} />
      <ThemedView style={{ ...viewStyles.view, width: '80%', minHeight: 'auto', flex: 1 }}>
        <ThemedText type="title">{data?.questions?.[0].prompt}</ThemedText>
      </ThemedView>
      <Br />
      <ThemedView style={{ ...viewStyles.view, width: '100%', minHeight: 'auto', flex: 1 }}>
        <GetQuestionButton />
      </ThemedView>
    </ThemedView>
  );
}
