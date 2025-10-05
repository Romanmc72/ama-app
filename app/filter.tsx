import { useRouter } from 'expo-router';
import { Cancel, Tag, ThemedView } from '@/components';
import { viewStyles } from '@/styles/view';
import { QuestionTag } from '@/shapes';
import { useFilterContext } from '@/contexts';

// TODO: Get this to work with the filter context
export default function FilterModal() {
  const { tags, addTag, removeTag } = useFilterContext();
  const router = useRouter();
  return (
    <ThemedView style={viewStyles.view}>
      <Cancel onPress={() => router.back()} />
      {Object.values(QuestionTag).map((t) =>
        tags.includes(t) ? (
          // TODO: Don't use onCancel, use onPress, you need a press action in both cases dummy
          <Tag color="#ff0000" cancellable={true} onCancel={() => removeTag(t)} key={t}>
            {t}
          </Tag>
        ) : (
          <Tag onCancel={() => addTag(t)} cancellable={true} key={t}>
            {t}
          </Tag>
        ),
      )}
    </ThemedView>
  );
}
