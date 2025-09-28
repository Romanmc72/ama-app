import Trash from '@/components/Trash';
import Cancel from '@/components/Cancel';
import Plus from '@/components/Plus';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import { Modal, ModalProps } from 'react-native';
import { viewStyles } from '@/styles/view';
import { useLists } from '@/hooks';
import { useUserContext } from '@/contexts';

export interface AddToListModalProps extends Omit<ModalProps, 'animationType'> {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

// TODO Finish this component and its rows
export default function AddToListModal(props: AddToListModalProps) {
  const { user, idToken } = useUserContext();
  const { data } = useLists({ userId: user?.userId ?? '', idToken: idToken ?? '' });
  return (
    <Modal animationType="slide" visible={props.visible}>
      <ThemedView style={viewStyles.view}>
        <Cancel onPress={() => props.setVisible(!props.visible)} />
        {loadingLists && <ThemedText>Loading lists...</ThemedText>}
        {!listLoadingError &&
          lists &&
          lists.map((eachList) => (
            
          ))}
      </ThemedView>
    </Modal>
  );
}
