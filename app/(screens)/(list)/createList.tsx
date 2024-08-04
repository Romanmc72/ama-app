import Br from '@/components/Br';
import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';
import { useRouter } from 'expo-router';

export default function CreateList(): JSX.Element {
  const router = useRouter();
  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText type="title">TODO: implement "Create List" page</ThemedText>
      <Br />
      <Button onPress={() => router.push(routeTree.SCREENS.ask.routerPath)}>
        Create List (pretend)
      </Button>
    </ThemedView>
  );
}
