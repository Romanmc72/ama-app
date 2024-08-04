import Br from '@/components/Br';
import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';
import { useRouter } from 'expo-router';

export default function ViewList(): JSX.Element {
  const router = useRouter();
  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText type="title">TODO: implement "View List" page</ThemedText>
      <Br />
      <Button onPress={() => router.push(routeTree.LIST.createList.routerPath)}>Create List</Button>
    </ThemedView>
  );
}
