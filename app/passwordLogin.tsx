import { useRouter } from 'expo-router';
import Br from '@/components/Br';
import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';

export default function PasswordLogin(): JSX.Element {
  const router = useRouter();
  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText>Password Login</ThemedText>
      <Br />
      <Button onPress={() => router.replace(routeTree.SCREENS.ask.routerPath)}>Sign In</Button>
    </ThemedView>
  );
}
