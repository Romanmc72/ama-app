import { useRouter } from 'expo-router';
import { Br, Button, ThemedText, ThemedView } from '@/components';
import { routeTree } from '@/constants/Routes';
import { useUserContext } from '@/contexts';
import { viewStyles } from '@/styles/view';

export default function Settings(): JSX.Element {
  const router = useRouter();
  const { user, logOut } = useUserContext();
  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText type="subtitle">Welcome, {user?.name}</ThemedText>
      <Br />
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
      <Button onPress={logOut}>Log Out</Button>
    </ThemedView>
  );
}
