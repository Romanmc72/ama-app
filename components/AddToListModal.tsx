import Cancel from '@/components/Cancel';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import { Modal, ModalProps } from 'react-native';
import { viewStyles } from '@/styles/view';
import { useLists } from '@/hooks';
import { useUserContext } from '@/contexts';
import { QuestionId } from '@/shapes';
import AddToListModalRow from './AddToListModalRow';

/**
 * The properties required to instantiate the "add to list" modal.
 */
export interface AddToListModalProps extends Omit<ModalProps, 'animationType'>, QuestionId {
  /** Whether or not the modal is visible. */
  visible: boolean;
  /** The trigger for changing the modal's visibility. */
  setVisible: (visible: boolean) => void;
}

export default function AddToListModal(props: AddToListModalProps) {
  const { user, idToken } = useUserContext();
  const { data, isLoading, isSuccess } = useLists({
    userId: user?.userId ?? '',
    idToken: idToken ?? '',
  });
  return (
    <Modal animationType="slide" visible={props.visible}>
      <ThemedView style={viewStyles.view}>
        <Cancel onPress={() => props.setVisible(!props.visible)} />
        {isLoading && <ThemedText>Loading lists...</ThemedText>}
        {isSuccess &&
          data &&
          data.map((list) => (
            <AddToListModalRow key={list.listId} list={list} questionId={props.questionId} />
          ))}
      </ThemedView>
    </Modal>
  );
}
