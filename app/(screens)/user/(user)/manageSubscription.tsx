import SideBySideButtons from '@/components/SideBySideButtons';
import { Br, Button, ThemedText, ThemedView } from '@/components';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';
import { useRouter } from 'expo-router';

export default function ManageSubscription(): JSX.Element {
  const router = useRouter();
  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText type="title">TODO: Manage Your Subscription</ThemedText>
      <Br />
      <SideBySideButtons
        buttons={[
          <Button onPress={() => router.replace(routeTree.SCREENS.settings.routerPath)}>
            Save
          </Button>,
          <Button onPress={() => router.replace(routeTree.SCREENS.settings.routerPath)}>
            Cancel
          </Button>,
        ]}
      />
    </ThemedView>
  );
}
