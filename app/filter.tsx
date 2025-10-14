import { useRouter } from 'expo-router';
import { Cancel, Tag, ThemedView } from '@/components';
import { QuestionTag } from '@/shapes';
import { viewStyles } from '../styles/view';

export default function FilterModal() {
  const router = useRouter();
  return (
    <ThemedView style={viewStyles.view}>
      <ThemedView style={{ marginRight: '90%', flex: 1 }}>
        <Cancel onPress={() => router.back()} />
      </ThemedView>
      <ThemedView
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          paddingHorizontal: 16,
        }}>
        {Object.values(QuestionTag).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </ThemedView>
    </ThemedView>
  );
}
