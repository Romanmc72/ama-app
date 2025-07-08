import { JSX } from 'react';
import { Stack, useRouter } from 'expo-router';
import Br from '@/components/Br';
import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';
import { ThemedView } from '@/components/ThemedView';
import { useCreateUser } from '@/hooks';
import { useUserContext } from '@/contexts';

export default function SelectAuthProvider(): JSX.Element {
  const router = useRouter();
  const userContext = useUserContext();
  const createUser = useCreateUser();
  const goToQuestion = () => {
    createUser.mutate(
      {
        name: 'TODO: John Doe',
        email: 'john@doe.com',
        tier: 'free',
        subscription: {
          payCadence: 'monthly',
          renewalDate: new Date(),
        },
        settings: {
          colorScheme: {
            foreground: 'default',
            background: 'default',
            highlightedBackground: 'default',
            highlightedForeground: 'default',
          },
        },
        lists: [],
      },
      {
        onSuccess: (data) => {
          userContext?.setUser(data);
        },
      },
    );

    router.push(routeTree.SCREENS.ask.routerPath);
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
