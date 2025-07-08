import { JSX, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';
import { Link, useLocalSearchParams } from 'expo-router';
import { useList } from '../../../hooks/api/useList';
import { TextInput } from 'react-native';
import { useUserContext } from '@/contexts';

export default function ListPage(): JSX.Element {
  const { id: listId }: { id: string } = useLocalSearchParams();
  const { user } = useUserContext();
  const { data } = useList({ userId: user?.userId ?? '', listId });
  const [listName, setListName] = useState<string>('');

  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText type="title">{data?.name ?? 'Loading'}</ThemedText>
      <TextInput value={listName} onChangeText={setListName} placeholder="List name" />
      {data?.questions?.length &&
        data?.questions.map((q) => (
          <Link key={q.questionId} href={routeTree.ROOT.ask.routerPath}>
            {q.prompt}
          </Link>
        ))}
    </ThemedView>
  );
}
