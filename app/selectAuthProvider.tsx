import { Stack, useRouter } from 'expo-router';
import Br from '@/components/Br';
import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';
import { ThemedView } from '@/components/ThemedView';

export default function SelectAuthProvider(): JSX.Element {
  const router = useRouter();
  const goToQuestion = () => {
    router.push(routeTree.SCREENS.ask.path);
  };
  return (
    <ThemedView style={viewStyles.view}>
      <Stack.Screen options={{ title: 'Log In' }} />
      <ThemedText>Select Auth Provider Page</ThemedText>
      <Br />
      <Button onPress={goToQuestion}>Google</Button>
      <Br />
      <Button onPress={goToQuestion}>Apple</Button>
      <Br />
      <Button onPress={() => router.push(routeTree.ROOT.passwordLogin.routerPath)}>Email</Button>
    </ThemedView>
  );
}
