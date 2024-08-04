import { useState } from 'react';
import { fetchQuestion } from '@/api/question';
import { Question } from '@/shapes';
import Br from '@/components/Br';
import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { Waver } from '@/components/Waver';
import { viewStyles } from '@/styles/view';
import { ThemedView } from '@/components/ThemedView';

export const ASK_QUESTION_NAME = 'Ask Me Anything';

export default function Ask(): JSX.Element {
  const [question, setQuestion] = useState<Question>();
  const [fetchingQuestion, setFetchingQuestion] = useState<boolean>(false);

  const getNewQuestion = async () => {
    setFetchingQuestion(true);
    fetchQuestion({ finalId: question?.id }).then(
      (data) => {
        setQuestion(data);
      },
      (err) => {
        console.error(err);
      },
    );
    // adding a small delay so folks don't spam the API.
    setTimeout(() => setFetchingQuestion(false), 3000);
  };

  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText type="title">{question ? question.prompt : 'Grab a question!'}</ThemedText>
      <Br />
      {question ? null : <Waver waveAble={'👇'} />}
      <Br />
      <Button disabled={!fetchingQuestion} onPress={getNewQuestion}>
        Get New Question
      </Button>
    </ThemedView>
  );
}
