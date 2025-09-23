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
  const { logIn } = useUserContext();

  if (isLoggedIn) {
    console.log('You are logged in, redirecting from INDEX!');
    return <Redirect href={'/ask'} />;
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
      <Button
        onPress={() => {
          logIn(null);
          router.push(routeTree.SCREENS.ask.routerPath);
        }}>
        Get started anonymously
      </Button>
    </ThemedView>
  );
}
