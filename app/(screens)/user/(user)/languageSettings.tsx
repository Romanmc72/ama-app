import Br from '@/components/Br';
import Button from '@/components/Button';
import SideBySideButtons from '@/components/SideBySideButtons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function LanguageSettings(): JSX.Element {
  const router = useRouter();
  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText type="title">TODO: Implement Localization</ThemedText>
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
