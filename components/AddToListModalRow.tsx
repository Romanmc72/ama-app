import { useCallback, useMemo } from 'react';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import { List, QuestionId } from '@/shapes';
import { useAddQuestionToList, useListQuestion, useRemoveQuestionFromList } from '@/hooks';
import { useUserContext } from '@/contexts';
import { Loading, Plus, Trash } from './icons';

/** The properties to render a row in the add to list modal. */
export interface AddToListModalRowProps extends QuestionId {
  /** The list to render for this row. */
  list: List;
}

export default function AddToListModalRow(props: AddToListModalRowProps) {
  const addQuestion = useAddQuestionToList();
  const removeQuestion = useRemoveQuestionFromList();
  const { idToken, user } = useUserContext();
  const apiProps = useMemo(
    () => ({
      idToken: idToken ?? '',
      userId: user?.userId ?? '',
      listId: props.list.listId,
      questionId: props.questionId,
    }),
    [idToken, user, props.list.listId, props.questionId],
  );
  const { isSuccess, isLoading } = useListQuestion(apiProps);
  const onPressAdd = useCallback(() => {
    addQuestion.mutate(apiProps);
  }, [addQuestion, apiProps]);
  const onPressRemove = useCallback(() => {
    removeQuestion.mutate(apiProps);
  }, [removeQuestion, apiProps]);
  return (
    <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 5 }}>
      <ThemedText>{props.list.name}</ThemedText>
      {isLoading && <Loading />}
      {isSuccess && !isLoading && <Trash onPress={onPressRemove} />}
      {!isSuccess && !isLoading && <Plus onPress={onPressAdd} />}
    </ThemedView>
  );
}
