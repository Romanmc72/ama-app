import { useRouter } from 'expo-router';
import { Cancel, Tag, ThemedView } from '@/components';
import { viewStyles } from '@/styles/view';
import { QuestionTag } from '@/shapes';

export default function FilterModal() {
  const router = useRouter();
  return (
    <ThemedView style={viewStyles.view}>
      <Cancel onPress={() => router.back()} />
      {Object.values(QuestionTag).map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </ThemedView>
  );
}
