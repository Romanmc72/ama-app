import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useQuestion, useRemoveQuestionFromList } from '@/hooks';
import { useUserContext } from '@/contexts';
import { Br, ThemedText, ThemedView, Trash } from '@/components';
import { useList } from '@/hooks/api/useList';

export default function ListQuestionPage() {
  const router = useRouter();
  const {
    listId,
    questionId,
  }: {
    listId: string;
    questionId: string;
  } = useLocalSearchParams();
  const { idToken, user } = useUserContext();
  const { data: list } = useList({ userId: user?.userId ?? '', listId, idToken: idToken ?? '' });
  const { data, isError, isFetching } = useQuestion({ idToken: idToken ?? '', questionId });
  const removeQuestion = useRemoveQuestionFromList();
  if (isFetching) {
    return <ThemedText>Loading...</ThemedText>;
  }
  if (isError) {
    return <ThemedText>Nothing here</ThemedText>;
  }
  return (
    <ThemedView>
      <Stack.Screen options={{ title: list?.list.name ?? '?' }} />
      <ThemedText type="title">{data?.prompt}</ThemedText>
      <Br />
      <Trash
        onPress={() => {
          removeQuestion.mutate({
            idToken: idToken ?? '',
            userId: user?.userId ?? '',
            listId,
            questionId,
          });
          router.back();
        }}
        disabled={false}
      />
    </ThemedView>
  );
}
