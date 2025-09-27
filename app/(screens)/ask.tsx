import { JSX, useCallback, useMemo, useState } from 'react';
import {
  Br,
  Button,
  Cancel,
  Like,
  Plus,
  SideBySideButtons,
  ThemedText,
  ThemedView,
  Waver,
} from '@/components';
import { viewStyles } from '@/styles/view';
import { useAddQuestionToList, useList, useLists, useQuestion } from '@/hooks';
import { useUserContext } from '@/contexts';
import { LIKED_QUESTION_LIST_ID } from '@/constants/data';
import { Modal } from 'react-native';

export const ASK_QUESTION_NAME = 'Ask Me Anything';
/** Wait a little bit before re-enabling the button. */
const buttonDelay = 1000;

// TODO: add like button and modal to save to a specific list
export default function Ask(): JSX.Element {
  const [hasPressed, setHasPressed] = useState(false);
  const [justPressed, setJustPressed] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const addQuestion = useAddQuestionToList();
  const { idToken, user } = useUserContext();
  const { data: listData, isSuccess: listFetched } = useList({
    listId: LIKED_QUESTION_LIST_ID,
    userId: user?.userId ?? '',
    idToken: idToken ?? '',
  });
  const {
    data: lists,
    isLoading: loadingLists,
    isError: listLoadingError,
  } = useLists({
    userId: user?.userId ?? '',
    idToken: idToken ?? '',
  });
  const {
    data: question,
    isSuccess: questionFetched,
    isError,
    isFetching,
    error,
    refetch,
  } = useQuestion({
    idToken: idToken ?? '',
    random: true,
  });
  const alreadyLiked = useMemo(() => {
    return (
      listFetched &&
      questionFetched &&
      listData?.questions?.some((q) => q.questionId === question?.questionId)
    );
  }, [listFetched, questionFetched, listData, question]);

  const GetQuestionButton = useCallback(() => {
    return (
      <Button
        disabled={isFetching || justPressed}
        onPress={() => {
          console.log('Fetching new question...');
          if (hasPressed) refetch({ cancelRefetch: true });
          setHasPressed(true);
          setJustPressed(true);
          setLiked(false);
          setTimeout(() => {
            setJustPressed(false);
          }, buttonDelay);
        }}>
        {isError ? error.message : 'Get New Question'}
      </Button>
    );
  }, [error, hasPressed, justPressed, isError, isFetching, refetch]);

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
              <Plus onPress={() => setModalIsVisible(!modalIsVisible)} />,
            ]}
          />
        </ThemedView>
        <Br />
        <ThemedView style={{ ...viewStyles.view, width: '100%', minHeight: 'auto', flex: 1 }}>
          <GetQuestionButton />
        </ThemedView>

        <Modal animationType="slide" visible={modalIsVisible}>
          <ThemedView style={viewStyles.view}>
            <Cancel onPress={() => setModalIsVisible(!modalIsVisible)} />
            {loadingLists && <ThemedText>Loading lists...</ThemedText>}
            {!listLoadingError &&
              lists &&
              lists.map((eachList) => (
                <ThemedView>
                  <ThemedText>{eachList.name}</ThemedText>
                  <Plus
                    onPress={() => {
                      addQuestion.mutate({
                        idToken: idToken ?? '',
                        questionId: question?.questionId,
                        listId: eachList.listId,
                        userId: user?.userId ?? '',
                      });
                    }}
                  />
                </ThemedView>
              ))}
          </ThemedView>
        </Modal>
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
