import Br from '@/components/Br';
import Button from '@/components/Button';
import { ThemedView } from '@/components/ThemedView';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';
import { useRouter } from 'expo-router';

export default function Settings(): JSX.Element {
  const router = useRouter();
  return (
    <ThemedView style={viewStyles.view}>
      <Button onPress={() => router.replace(routeTree.USER.manageSubscription.routerPath)}>
        Change Subscription
      </Button>
      <Br />
      <Button onPress={() => alert('lmao fat chance')}>Delete Account</Button>
    </ThemedView>
  );
}
