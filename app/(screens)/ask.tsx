import { JSX, useCallback, useMemo, useState } from 'react';
import {
  Br,
  Filter,
  Left,
  Like,
  Loading,
  Plus,
  Right,
  Shuffle,
  SideBySideButtons,
  Tag,
  ThemedText,
  ThemedView,
  Waver,
} from '@/components';
import { viewStyles } from '@/styles/view';
import { useAddQuestionToList, useList, useQuestion } from '@/hooks';
import { useFilterContext, useUserContext } from '@/contexts';
import { LIKED_QUESTION_LIST_ID } from '@/constants/data';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

export const ASK_QUESTION_NAME = 'Ask Me Anything';
/** Wait a little bit before re-enabling the button. */
const buttonDelay = 1000;

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
  const { tags, removeTag } = useFilterContext();
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
      tags: tags.length > 0 ? tags : undefined,
    }),
    [idToken, questionId, finalId, random, tags],
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
                setRandom(false);
                setQuestionId(undefined);
                setFinalId(question.questionId);
                setLiked(false);
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
        disabled={visitedQuestions.length <= 1 || isFetching || justPressed}
        onPress={
          visitedQuestions.length > 0
            ? () => {
                setRandom(false);
                const lastQuestionId = visitedQuestions[visitedQuestions.length - 1];
                setQuestionId(lastQuestionId);
                setFinalId(undefined);
                setLiked(false);
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

  const showQuestion = question && hasPressed && !isError;

  return (
    <ThemedView style={viewStyles.view}>
      <ThemedView style={{ flexDirection: 'row' }}>
        <ScrollView horizontal={true}>
          {tags.map((t) => (
            <Tag key={t} onPress={() => removeTag(t)}>
              {t}
            </Tag>
          ))}
        </ScrollView>
        <ThemedView style={{ marginLeft: 'auto' }}>
          <Filter onPress={() => router.push('/filter')} />
        </ThemedView>
      </ThemedView>
      <ScrollView
        style={{
          flex: 1,
          minHeight: '47%',
          width: showQuestion ? '80%' : '100%',
        }}>
        <ThemedView style={viewStyles.view}>
          {isFetching && hasPressed ? (
            <Loading />
          ) : !showQuestion ? (
            <ThemedText type="title">Grab a new Question!</ThemedText>
          ) : (
            <>
              <ThemedText type="title">{question.prompt}</ThemedText>
              <SideBySideButtons
                buttons={[
                  <Like onPress={onPressLike} disabled={alreadyLiked || liked} />,
                  <Plus onPress={() => router.push(`/${question.questionId}`)} />,
                ]}
              />
            </>
          )}
          <Br />
          {hasPressed ? null : <Waver waveAble={'👇'} />}
        </ThemedView>
      </ScrollView>
      <Br />
      <ThemedView
        style={{
          ...viewStyles.view,
          justifyContent: 'flex-start',
          width: '100%',
          minHeight: 'auto',
          flex: 1,
        }}>
        <SideBySideButtons
          buttons={[<PreviousQuestionButton />, <GetQuestionButton />, <NextQuestionButton />]}
        />
      </ThemedView>
    </ThemedView>
  );
}
