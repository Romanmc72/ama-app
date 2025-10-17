import { JSX } from 'react';
import { useRouter } from 'expo-router';
import AMALogo from '@/components/svg/AMALogo';
import { viewStyles } from '@/styles/view';
import { routeTree } from '@/constants/Routes';
import { Br, Button, ThemedView } from '@/components';
import { useUserContext } from '@/contexts';

export default function Home(): JSX.Element {
  const router = useRouter();
  const { logIn } = useUserContext();

  return (
    <ThemedView style={viewStyles.view}>
      <AMALogo size={150} />
      <Br />
      <Button onPress={() => router.push('/logIn')}>Log in</Button>
      <Br />
      <Button onPress={() => router.push('/signUp')}>Sign up</Button>
      <Br />
      <Button
        onPress={() => {
          logIn(null);
          router.push('/ask');
        }}>
        Get started anonymously
      </Button>
    </ThemedView>
  );
}
