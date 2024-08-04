import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import { ThemedView } from '@/components/ThemedView';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';

export default function SignUp(): JSX.Element {
  const router = useRouter();
  return (
    <ThemedView style={viewStyles.view}>
      <Button onPress={() => router.replace(routeTree.ROOT.index.routerPath)}>Sign Up</Button>
    </ThemedView>
  );
}
