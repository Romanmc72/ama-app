import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import { List, QuestionId } from '@/shapes';
import { useAddQuestionToList, useListQuestion, useRemoveQuestionFromList } from '@/hooks';
import { Loading, Plus, Trash } from './icons';

/** The properties to render a row in the add to list modal. */
export interface AddToListModalRowProps extends QuestionId {
  /** The list to render for this row. */
  list: List;
}

export default function AddToListModalRow(props: AddToListModalRowProps) {
  const addQuestion = useAddQuestionToList();
  const removeQuestion = useRemoveQuestionFromList();
  const { isSuccess, isLoading } = useListQuestion(props.list.listId, props.questionId);
  return (
    <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 5 }}>
      <ThemedText>{props.list.name}</ThemedText>
      {isLoading && <Loading />}
      {isSuccess && !isLoading && (
        <Trash onPress={() => removeQuestion(props.list.listId, props.questionId)} />
      )}
      {!isSuccess && !isLoading && (
        <Plus onPress={() => addQuestion(props.list.listId, props.questionId)} />
      )}
    </ThemedView>
  );
}
