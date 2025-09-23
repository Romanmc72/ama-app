import { JSX, useState } from 'react';
import { Br, ThemedInput, ThemedText, ThemedView } from '@/components';
import { viewStyles } from '@/styles/view';
import { Link, useLocalSearchParams } from 'expo-router';
import { useList } from '@/hooks/api/useList';
import { useUserContext } from '@/contexts';

export default function ListPage(): JSX.Element {
  const { id: listId }: { id: string } = useLocalSearchParams();
  const { user, idToken } = useUserContext();
  const { data, isLoading } = useList({
    userId: user?.userId ?? '',
    listId,
    idToken: idToken ?? '',
  });
  const [listName, setListName] = useState<string>('');

  if (isLoading) {
    return (
      <ThemedView style={viewStyles.view}>
        <ThemedText type="title">Loading...</ThemedText>
      </ThemedView>
    );
  }

  // TODO: Get the list name to be in the stack navigation header
  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText type="title">{data?.name ?? '<No Name>'}</ThemedText>
      <ThemedInput value={listName} onChangeText={setListName} placeholder="List name" />
      {data?.questions?.length &&
        data?.questions.map((q) => (
          <Link key={q.questionId} href={'/ask'}>
            <Br />
            <ThemedText>{q.prompt}</ThemedText>
          </Link>
        ))}
    </ThemedView>
  );
}
