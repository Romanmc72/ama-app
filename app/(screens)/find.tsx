import Button from '@/components/Button';
import { ThemedView } from '@/components/ThemedView';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';
import { useRouter } from 'expo-router';

export default function Find(): JSX.Element {
  const router = useRouter();

  return (
    <ThemedView style={viewStyles.view}>
      <Button onPress={() => router.push(routeTree.ROOT.index.routerPath)}>
        Find Page (go home now actually)
      </Button>
    </ThemedView>
  );
}
