import { JSX, useCallback, useState } from 'react';
import Br from '@/components/Br';
import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { Waver } from '@/components/Waver';
import { viewStyles } from '@/styles/view';
import { ThemedView } from '@/components/ThemedView';
import { useQuestion } from '@/hooks';

export const ASK_QUESTION_NAME = 'Ask Me Anything';

export default function Ask(): JSX.Element {
  const [hasPressed, setHasPressed] = useState(false);
  const { data: question, isPending, isError, refetch } = useQuestion({});

  const GetQuestionButton = useCallback(() => {
    return (
      <Button
        disabled={!isPending || isError}
        onPress={() => {
          console.log('Fetching new question...');
          if (hasPressed) refetch({ cancelRefetch: true });
          setHasPressed(true);
        }}>
        {isError ? 'Oops! Try again' : 'Get New Question'}
      </Button>
    );
  }, [hasPressed, isError, isPending, refetch, setHasPressed]);

  if (question) {
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
