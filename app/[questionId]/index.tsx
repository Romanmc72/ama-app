import { Cancel } from '@/components';
import { AddToListModalRow, ThemedText, ThemedView } from '@/components';
import { viewStyles } from '@/styles/view';
import { useLists } from '@/hooks';
import { useUserContext } from '@/contexts';
import { QuestionId } from '@/shapes';
import { useLocalSearchParams, useRouter } from 'expo-router';

// TODO: When the user removes from the liked questions list, clear the
// cache on the main ask page so that the thumbs up re-highlights
export default function AddToListModal() {
  const { questionId }: QuestionId = useLocalSearchParams();
  const router = useRouter();
  const { user, idToken } = useUserContext();
  const { data, isLoading, isSuccess } = useLists({
    userId: user?.userId ?? '',
    idToken: idToken ?? '',
  });
  return (
    <ThemedView style={viewStyles.view}>
      <ThemedView style={{ marginRight: '90%', flex: 1 }}>
        <Cancel onPress={() => router.back()} />
      </ThemedView>
      <ThemedView style={{ flex: 1, minHeight: '90%' }}>
        {isLoading && <ThemedText>Loading lists...</ThemedText>}
        {isSuccess &&
          data &&
          data.map((list) => (
            <AddToListModalRow key={list.listId} list={list} questionId={questionId} />
          ))}
      </ThemedView>
    </ThemedView>
  );
}
