import { JSX } from 'react';
import { Redirect, useRouter } from 'expo-router';
import AMALogo from '@/components/svg/AMALogo';
import { viewStyles } from '@/styles/view';
import { routeTree } from '@/constants/Routes';
import { Br, Button, ThemedView } from '@/components';
import { useUserContext } from '@/contexts';

export default function Home(): JSX.Element {
  const router = useRouter();
  const { isLoggedIn } = useUserContext();

  if (isLoggedIn) {
    return <Redirect href={routeTree.SCREENS.ask.routerPath} />;
  }

  return (
    <ThemedView style={viewStyles.view}>
      <AMALogo size={150} />
      <Br />
      <Button onPress={() => router.push(routeTree.AUTH.selectAuthProvider.routerPath)}>
        Log in
      </Button>
      <Br />
      <Button onPress={() => router.push(routeTree.AUTH.signUp.routerPath)}>Sign up</Button>
      <Br />
      <Button onPress={() => router.push(routeTree.SCREENS.ask.routerPath)}>
        Get started anonymously
      </Button>
    </ThemedView>
  );
}
