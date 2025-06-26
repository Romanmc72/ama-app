import { JSX, useState } from 'react';
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

  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText type="title">{question ? question.prompt : 'Grab a question!'}</ThemedText>
      <Br />
      {question && hasPressed ? null : <Waver waveAble={'👇'} />}
      <Br />
      <Button
        disabled={!isPending}
        onPress={() => {
          console.log('Fetching new question...');
          refetch({});
          setHasPressed(true);
        }}>
        {isError ? 'Oops! Try again' : 'Get New Question'}
      </Button>
    </ThemedView>
  );
}
