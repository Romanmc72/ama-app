import Br from '@/components/Br';
import Button from '@/components/Button';
import { ThemedView } from '@/components/ThemedView';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';
import { useRouter } from 'expo-router';

export default function Settings(): JSX.Element {
  const router = useRouter();
  return (
    <ThemedView style={viewStyles.view}>
      <Button onPress={() => router.push(routeTree.USER.editAccount.routerPath)}>Account</Button>
      <Br />
      <Button onPress={() => router.push(routeTree.USER.appearanceSettings.routerPath)}>
        Appearance
      </Button>
      <Br />
      <Button onPress={() => router.push(routeTree.USER.languageSettings.routerPath)}>
        Language
      </Button>
      <Br />
      <Button onPress={() => router.push(routeTree.ROOT.index.routerPath)}>Log Out</Button>
    </ThemedView>
  );
}
