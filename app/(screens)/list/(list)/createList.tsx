import { JSX, useState } from 'react';
import { Br, Button, ThemedInput, ThemedText, ThemedView } from '@/components';
import { viewStyles } from '@/styles/view';
import { Stack, useRouter } from 'expo-router';
import { useCreateList } from '@/hooks';

export default function CreateList(): JSX.Element {
  const router = useRouter();
  const [listName, setListName] = useState<string>('');
  const createList = useCreateList();

  const handleCreateList = () => {
    createList(listName);
    router.push('/list');
  };
  return (
    <ThemedView style={viewStyles.view}>
      <Stack.Screen options={{ title: 'Create list' }} />
      <ThemedText type="title">Name your new list</ThemedText>
      <ThemedInput value={listName} onChangeText={setListName} placeholder="List name" />
      <Br />
      <Button onPress={handleCreateList} disabled={listName.trim().length === 0}>
        Create List
      </Button>
    </ThemedView>
  );
}
