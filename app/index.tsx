import { JSX } from 'react';
import { useRouter } from 'expo-router';
import Br from '@/components/Br';
import Button from '@/components/Button';
import AMALogo from '@/components/svg/AMALogo';
import { viewStyles } from '@/styles/view';
import { routeTree } from '@/constants/Routes';
import { ThemedView } from '@/components/ThemedView';

export default function Home(): JSX.Element {
  const router = useRouter();

  return (
    <ThemedView style={viewStyles.view}>
      <AMALogo size={150} />
      <Br />
      <Button onPress={() => router.push(routeTree.ROOT.selectAuthProvider.routerPath)}>
        Log In
      </Button>
      <Br />
      <Button onPress={() => router.push(routeTree.ROOT.signUp.routerPath)}>Sign Up</Button>
      <Br />
      <Button onPress={() => router.push(routeTree.SCREENS.ask.routerPath)}>
        Get Started Anonymously
      </Button>
    </ThemedView>
  );
}
