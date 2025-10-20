import { useRouter, Stack } from 'expo-router';
import { JSX, useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { Plus, Row, ThemedText, ThemedView } from '@/components';
import { viewStyles } from '@/styles/view';
import { useLists } from '@/hooks/api/useList';
import { useUserContext } from '@/contexts';

export default function ViewList(): JSX.Element {
  const router = useRouter();
  const { user, idToken } = useUserContext();
  const { data, isLoading, isError, refetch } = useLists({
    userId: user?.firebaseId ?? '',
    idToken: idToken ?? '',
  });
  const [justReloaded, setJustReloaded] = useState(false);

  const onPress = useCallback(() => router.push('/list/createList'), [router]);

  useEffect(() => {
    if (!isLoading && isError && !justReloaded) {
      refetch();
      setJustReloaded(true);
      const timer = setTimeout(() => {
        setJustReloaded(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isError, isLoading, justReloaded, refetch]);

  if (isLoading) {
    return (
      <ThemedView key="loading" style={viewStyles.view}>
        <ThemedText type="title">Loading...</ThemedText>
      </ThemedView>
    );
  }
  if (isError) {
    return (
      <ThemedView key="no-lists" style={viewStyles.view}>
        <ThemedText type="title">Could not load lists! Trying again...</ThemedText>
      </ThemedView>
    );
  }
  return (
    <ScrollView>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView key="question-list" style={viewStyles.view}>
        <ThemedView style={{ flex: 1, marginRight: '90%' }}>
          <Plus onPress={onPress} />
        </ThemedView>
        <ThemedView style={{ flex: 1, minHeight: '90%' }}>
          {data?.length &&
            data.map((list, index) => (
              <Row
                key={list.listId}
                id={list.listId}
                href={`/list/${list.listId}`}
                text={list.name}
                index={index}
                totalItems={data.length}
              />
            ))}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}
