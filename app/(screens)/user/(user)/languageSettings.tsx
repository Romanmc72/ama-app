import { Br, Button, SideBySideButtons, ThemedText, ThemedView } from '@/components';
import { viewStyles } from '@/styles/view';
import { useRouter } from 'expo-router';

export default function LanguageSettings() {
  const router = useRouter();
  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText type="title">TODO: Implement Localization</ThemedText>
      <Br />
      <SideBySideButtons
        buttons={[
          <Button onPress={() => router.replace('/user')}>Save</Button>,
          <Button onPress={() => router.replace('/user')}>Cancel</Button>,
        ]}
      />
    </ThemedView>
  );
}
