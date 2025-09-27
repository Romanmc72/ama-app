import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView } from 'react-native';
import { Br, Button, Row, ThemedInput, ThemedText, ThemedView, Trash } from '@/components';
import { useUserContext } from '@/contexts';
import { useDeleteList, useList, useUpdateList } from '@/hooks';
import { viewStyles } from '@/styles/view';
import { useCallback, useState } from 'react';
import { LIKED_QUESTION_LIST_ID } from '@/constants/data';

export default function EditListPage() {
  const router = useRouter();
  const { listId }: { listId: string } = useLocalSearchParams();
  const { idToken, user } = useUserContext();
  const { data, isLoading } = useList({
    idToken: idToken ?? '',
    userId: user?.userId ?? '',
    listId,
  });
  const updateList = useUpdateList();
  const deleteList = useDeleteList();
  const [newName, setNewName] = useState('');
  const isLikedQuestionList = data?.list?.listId === LIKED_QUESTION_LIST_ID;
  const onDeleteList = useCallback(() => {
    deleteList.mutate(
      {
        idToken: idToken ?? '',
        userId: user?.userId ?? '',
        listId,
      },
      {
        onSuccess: () => {
          router.push('/list');
        },
      },
    );
  }, [deleteList, idToken, listId, router, user]);
  const onSaveListName = useCallback(() => {
    updateList.mutate(
      {
        idToken: idToken ?? '',
        userId: user?.userId ?? '',
        listId,
        name: newName,
      },
      {
        onSuccess: () => {
          setNewName('');
        },
      },
    );
  }, [idToken, listId, newName, updateList, user]);

  if (isLoading) {
    return (
      <ThemedView style={viewStyles.view}>
        <ThemedText type="title">Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <Stack.Screen options={{ title: `${data?.list?.name} - Edit` }} />
      <ThemedView style={viewStyles.view}>
        <ThemedText type="title">{data?.list?.name}</ThemedText>
        <Br />
        {!isLikedQuestionList && (
          <>
            <Trash onPress={onDeleteList} />
            <ThemedText type="subtitle">Edit Name</ThemedText>
            <ThemedInput placeholder="New list name" onChangeText={setNewName} value={newName} />
            <Button onPress={onSaveListName}>Save list name</Button>
          </>
        )}

        {data?.questions?.length &&
          data?.questions.map((q) => (
            <Row
              key={q.questionId}
              id={q.questionId}
              href={`/list/${listId}/question/${q.questionId}`}
              text={q.prompt.length > 20 ? q.prompt.slice(0, 17) + '...' : q.prompt}
            />
          ))}
      </ThemedView>
    </ScrollView>
  );
}
