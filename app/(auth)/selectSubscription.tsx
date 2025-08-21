import { useRouter } from 'expo-router';
import { Button, ThemedView } from '@/components';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';

export default function SelectSubscription(): JSX.Element {
  const router = useRouter();
  return (
    <ThemedView style={viewStyles.view}>
      <Button onPress={() => router.replace(routeTree.ROOT.index.routerPath)}>
        Select Subscription
      </Button>
    </ThemedView>
  );
}
