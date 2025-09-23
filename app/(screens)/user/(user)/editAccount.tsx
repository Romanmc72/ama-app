import { Br, Button, ThemedView } from '@/components';
import { routeTree } from '@/constants/Routes';
import { useUserContext } from '@/contexts';
import { viewStyles } from '@/styles/view';
import { useRouter } from 'expo-router';

export default function Settings() {
  const router = useRouter();
  const { deleteUser } = useUserContext();
  return (
    <ThemedView style={viewStyles.view}>
      <Button onPress={() => router.replace(routeTree.USER.manageSubscription.routerPath)}>
        Change Subscription
      </Button>
      <Br />
      <Button onPress={deleteUser}>Delete Account</Button>
    </ThemedView>
  );
}
