import { JSX, useCallback, useState } from 'react';
import { Br, Button, ThemedText, ThemedView, Waver } from '@/components';
import { viewStyles } from '@/styles/view';
import { useQuestion } from '@/hooks';
import { useUserContext } from '@/contexts';

export const ASK_QUESTION_NAME = 'Ask Me Anything';
/** Wait a little bit before re-enabling the button. */
const buttonDelay = 1000;

export default function Ask(): JSX.Element {
  const [hasPressed, setHasPressed] = useState(false);
  const [justPressed, setJustPressed] = useState(false);
  const { idToken } = useUserContext();
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

  if (question && hasPressed && !isError) {
    return (
      <ThemedView style={viewStyles.view}>
        <ThemedText type="title">{question.prompt}</ThemedText>
        <Br />
        <GetQuestionButton />
      </ThemedView>
    );
  }
  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText type="title">Grab a new Question!</ThemedText>
      <Br />
      {hasPressed ? null : <Waver waveAble={'👇'} />}
      <Br />
      <GetQuestionButton />
    </ThemedView>
  );
}
