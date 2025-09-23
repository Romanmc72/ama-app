import { JSX, useState } from 'react';
import { Br, Button, ThemedInput, ThemedText, ThemedView } from '@/components';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';
import { useRouter } from 'expo-router';
import { useCreateList } from '@/hooks';
import { useUserContext } from '@/contexts';

export default function CreateList(): JSX.Element {
  const router = useRouter();
  const [listName, setListName] = useState<string>('');
  const createList = useCreateList();
  const { user, idToken } = useUserContext();

  const handleCreateList = () => {
    createList.mutate({ userId: user?.userId ?? '', name: listName, idToken: idToken ?? '' });
    router.push(routeTree.SCREENS.ask.routerPath);
  };
  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText type="title">Name your new list</ThemedText>
      <ThemedInput value={listName} onChangeText={setListName} placeholder="List name" />
      <Br />
      <Button onPress={handleCreateList} disabled={listName.length === 0}>
        Create List
      </Button>
    </ThemedView>
  );
}
