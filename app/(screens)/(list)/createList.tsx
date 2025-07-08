import { JSX, useState } from 'react';
import Br from '@/components/Br';
import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';
import { useRouter } from 'expo-router';
import { useCreateList } from '../../../hooks/api/useList';
import { TextInput } from 'react-native';
import { useUserContext } from '@/contexts';

export default function CreateList(): JSX.Element {
  const router = useRouter();
  const [listName, setListName] = useState<string>('');
  const createList = useCreateList();
  const { user } = useUserContext();

  const handleCreateList = () => {
    createList.mutate({ userId: user?.userId ?? '', name: listName });
    router.push(routeTree.SCREENS.ask.routerPath);
  };
  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText type="title">Name your new list</ThemedText>
      <TextInput value={listName} onChangeText={setListName} placeholder="List name" />
      <Br />
      <Button onPress={handleCreateList} disabled={listName.length === 0}>
        Create List
      </Button>
    </ThemedView>
  );
}
