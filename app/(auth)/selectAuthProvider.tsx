import { JSX } from 'react';
import { Stack, useRouter } from 'expo-router';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';
import { Br, Button, ThemedText, ThemedView } from '@/components';

export default function SelectAuthProvider(): JSX.Element {
  const router = useRouter();
  const onSelectProvider = () => console.log('TODO: Set these up');
  return (
    <ThemedView style={viewStyles.view}>
      <Stack.Screen options={{ title: 'Log In' }} />
      <ThemedText>Select Auth Provider Page</ThemedText>
      <Br />
      <Button onPress={onSelectProvider}>Google</Button>
      <Br />
      <Button onPress={onSelectProvider}>Apple</Button>
      <Br />
      <Button onPress={() => router.push(routeTree.AUTH.passwordLogin.routerPath)}>Email</Button>
    </ThemedView>
  );
}
