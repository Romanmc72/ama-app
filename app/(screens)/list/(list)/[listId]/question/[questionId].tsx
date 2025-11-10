import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useQuestion, useRemoveQuestionFromList } from '@/hooks';
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
  const { data: list } = useList(listId);
  const { data, isError, isFetching } = useQuestion({ questionId });
  const removeQuestion = useRemoveQuestionFromList();
  if (isFetching) {
    return <ThemedText>Loading...</ThemedText>;
  }
  if (isError) {
    return <ThemedText>Nothing here</ThemedText>;
  }
  return (
    <ThemedView>
      <Stack.Screen options={{ title: list?.list?.name ?? '?' }} />
      <ThemedText type="title">{data?.prompt}</ThemedText>
      <Br />
      <Trash
        onPress={() => {
          removeQuestion(listId, questionId);
          router.back();
        }}
        disabled={false}
      />
    </ThemedView>
  );
}
