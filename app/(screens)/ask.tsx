import { JSX, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Br,
  Left,
  Like,
  Loading,
  Plus,
  Right,
  Shuffle,
  SideBySideButtons,
  ThemedText,
  ThemedView,
  Waver,
} from '@/components';
import { viewStyles } from '@/styles/view';
import { useAddQuestionToList, useList, useQuestion } from '@/hooks';
import { useUserContext } from '@/contexts';
import { LIKED_QUESTION_LIST_ID } from '@/constants/data';
import { useRouter } from 'expo-router';

export const ASK_QUESTION_NAME = 'Ask Me Anything';
/** Wait a little bit before re-enabling the button. */
const buttonDelay = 1000;

// TODO: add like button and modal to save to a specific list
export default function Ask(): JSX.Element {
  const [visitedQuestions, setVisitedQuestions] = useState<string[]>([]);
  const [questionId, setQuestionId] = useState<string | undefined>(undefined);
  const [finalId, setFinalId] = useState<string | undefined>(undefined);
  const [random, setRandom] = useState(true);
  const [hasPressed, setHasPressed] = useState(false);
  const [justPressed, setJustPressed] = useState(false);
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  const addQuestion = useAddQuestionToList();
  const { idToken, user } = useUserContext();
  const { data: listData, isSuccess: listFetched } = useList({
    listId: LIKED_QUESTION_LIST_ID,
    userId: user?.userId ?? '',
    idToken: idToken ?? '',
  });
  const queryProps = useMemo(
    () => ({
      idToken: idToken ?? '',
      questionId,
      finalId,
      random,
    }),
    [idToken, questionId, finalId, random],
  );
  const {
    data: question,
    isSuccess: questionFetched,
    isError,
    isFetching,
    refetch,
  } = useQuestion(queryProps);
  const alreadyLiked = useMemo(() => {
    return (
      listFetched &&
      questionFetched &&
      listData?.questions?.some((q) => q.questionId === question?.questionId)
    );
  }, [listFetched, questionFetched, listData, question]);

  const GetQuestionButton = useCallback(() => {
    return (
      <Shuffle
        disabled={isFetching || justPressed}
        onPress={() => {
          console.log('Fetching new question...');
          setQuestionId(undefined);
          setFinalId(undefined);
          setRandom(true);
          setHasPressed(true);
          setJustPressed(true);
          setLiked(false);
          setTimeout(() => {
            setJustPressed(false);
          }, buttonDelay);
          if (question?.questionId) {
            setVisitedQuestions((prev) => [...prev, question.questionId]);
          }
          if (hasPressed) refetch({ cancelRefetch: true });
        }}
      />
    );
  }, [hasPressed, justPressed, isFetching, refetch, question]);

  const NextQuestionButton = useCallback(
    () => (
      <Right
        disabled={visitedQuestions.length === 0 || isFetching || justPressed || !question}
        onPress={
          question && visitedQuestions.length > 0
            ? () => {
                console.log('RIGHT!');
                setRandom(false);
                setQuestionId(undefined);
                setFinalId(question.questionId);
                setVisitedQuestions((prev) => [...prev, question.questionId]);
                setTimeout(() => {
                  setJustPressed(false);
                }, buttonDelay);
              }
            : () => {}
        }
      />
    ),
    [justPressed, visitedQuestions, question, isFetching],
  );

  const PreviousQuestionButton = useCallback(
    () => (
      <Left
        disabled={visitedQuestions.length === 0 || isFetching || justPressed}
        onPress={
          visitedQuestions.length > 0
            ? () => {
                console.log('LEFT!');
                setRandom(false);
                const lastQuestionId = visitedQuestions[visitedQuestions.length - 1];
                setQuestionId(lastQuestionId);
                setFinalId(undefined);
                setVisitedQuestions((prev) => prev.slice(0, -1));
                setTimeout(() => {
                  setJustPressed(false);
                }, buttonDelay);
              }
            : () => {}
        }
      />
    ),
    [visitedQuestions, justPressed, isFetching],
  );

  const onPressLike = useCallback(() => {
    if (!question?.questionId || !idToken || !user?.userId) {
      console.log(
        `One of the required pieces is not defined Q: ${JSON.stringify(question)} || T: ${idToken} || U: ${JSON.stringify(user)}`,
      );
      return;
    }
    if (liked || alreadyLiked) {
      console.log(`Question is already liked ID: ${question.questionId}`);
      return;
    }
    addQuestion.mutate({
      idToken: idToken,
      questionId: question?.questionId,
      listId: LIKED_QUESTION_LIST_ID,
      userId: user?.userId,
    });
    setLiked(true);
  }, [alreadyLiked, idToken, addQuestion, question, user, liked]);

  if (question && hasPressed && !isError) {
    return (
      <ThemedView style={viewStyles.view}>
        <ThemedView style={{ ...viewStyles.view, width: '80%', minHeight: 'auto', flex: 1 }}>
          <ThemedText type="title">{question.prompt}</ThemedText>
          <SideBySideButtons
            buttons={[
              <Like onPress={onPressLike} disabled={alreadyLiked || liked} />,
              <Plus onPress={() => router.push(`/${question.questionId}`)} />,
            ]}
          />
        </ThemedView>
        <Br />
        <ThemedView style={{ ...viewStyles.view, width: '100%', minHeight: 'auto', flex: 1 }}>
          <SideBySideButtons
            buttons={[<PreviousQuestionButton />, <GetQuestionButton />, <NextQuestionButton />]}
          />
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={viewStyles.view}>
      <ThemedView style={{ ...viewStyles.view, width: '100%', minHeight: 'auto', flex: 1 }}>
        {isFetching && hasPressed ? (
          <Loading />
        ) : (
          <ThemedText type="title">Grab a new Question!</ThemedText>
        )}
        <Br />
        {hasPressed ? null : <Waver waveAble={'👇'} />}
      </ThemedView>
      <Br />
      <ThemedView style={{ ...viewStyles.view, width: '100%', minHeight: 'auto', flex: 1 }}>
        <SideBySideButtons
          buttons={[<PreviousQuestionButton />, <GetQuestionButton />, <NextQuestionButton />]}
        />
      </ThemedView>
    </ThemedView>
  );
}
