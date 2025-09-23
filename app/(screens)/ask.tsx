import { JSX, useCallback, useMemo, useState } from 'react';
import { Br, Button, ThemedText, ThemedView, Waver } from '@/components';
import { viewStyles } from '@/styles/view';
import { useAddQuestionToList, useQuestion } from '@/hooks';
import { useUserContext } from '@/contexts';
import { LIKED_QUESTION_LIST_ID } from '@/constants/data';

export const ASK_QUESTION_NAME = 'Ask Me Anything';
/** Wait a little bit before re-enabling the button. */
const buttonDelay = 1000;

// TODO: add like button and modal to save to a specific list
export default function Ask(): JSX.Element {
  const [hasPressed, setHasPressed] = useState(false);
  const [justPressed, setJustPressed] = useState(false);
  const addQuestion = useAddQuestionToList();
  const { idToken, user } = useUserContext();
  const likedQuestionListId = useMemo(
    () => (user?.lists.find((l) => l.listId === LIKED_QUESTION_LIST_ID) || {}).listId,
    [user],
  );
  const {
    data: question,
    isError,
    isFetching,
    error,
    refetch,
  } = useQuestion({
    idToken: idToken ?? '',
    random: true,
  });

  const GetQuestionButton = useCallback(() => {
    return (
      <Button
        disabled={isFetching || justPressed}
        onPress={() => {
          console.log('Fetching new question...');
          if (hasPressed) refetch({ cancelRefetch: true });
          setHasPressed(true);
          setJustPressed(true);
          setTimeout(() => {
            setJustPressed(false);
          }, buttonDelay);
        }}>
        {isError ? error.message : 'Get New Question'}
      </Button>
    );
  }, [error, hasPressed, justPressed, isError, isFetching, refetch]);

  const onPressLike = useCallback(() => {
    if (!question?.questionId || !idToken || !user?.userId || !likedQuestionListId) {
      console.log(
        `One of the required pieces is not defined Q: ${JSON.stringify(question)} || T: ${idToken} || U: ${JSON.stringify(user)} || L: ${likedQuestionListId}`,
      );
      return;
    }
    addQuestion.mutate({
      idToken: idToken,
      questionId: question?.questionId,
      listId: likedQuestionListId,
      userId: user?.userId,
    });
  }, [idToken, addQuestion, question, user, likedQuestionListId]);

  if (question && hasPressed && !isError) {
    return (
      <ThemedView style={viewStyles.view}>
        <ThemedView style={{ ...viewStyles.view, width: '80%', minHeight: 'auto', flex: 1 }}>
          <ThemedText type="title">{question.prompt}</ThemedText>
          <Button onPress={onPressLike}>Like</Button>
        </ThemedView>
        <Br />
        <ThemedView style={{ ...viewStyles.view, width: '100%', minHeight: 'auto', flex: 1 }}>
          <GetQuestionButton />
        </ThemedView>
      </ThemedView>
    );
  }
  return (
    <ThemedView style={viewStyles.view}>
      <ThemedView style={{ ...viewStyles.view, width: '100%', minHeight: 'auto', flex: 1 }}>
        <ThemedText type="title">Grab a new Question!</ThemedText>
        <Br />
        {hasPressed ? null : <Waver waveAble={'👇'} />}
      </ThemedView>
      <Br />
      <ThemedView style={{ ...viewStyles.view, width: '100%', minHeight: 'auto', flex: 1 }}>
        <GetQuestionButton />
      </ThemedView>
    </ThemedView>
  );
}
