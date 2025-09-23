import { Br, Button, ThemedText, ThemedView } from '@/components';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';
import { useRouter } from 'expo-router';
import SideBySideButtons from '@/components/SideBySideButtons';

export default function AppearanceSettings() {
  const router = useRouter();
  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText type="title">Change Appearance</ThemedText>
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
