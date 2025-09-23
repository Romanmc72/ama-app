import { useRouter } from 'expo-router';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';
import { useUserContext } from '@/contexts';
import { useState, useEffect } from 'react';
import { Br, Button, ThemedText, ThemedView } from '@/components';

export default function VerifyEmail() {
  const router = useRouter();
  const [dots, setDots] = useState<number>(0);
  const { isEmailVerificationPending, isLoggedIn, cancelCreateUser } = useUserContext();

  // simple loading animation for the dots
  useEffect(() => {
    setTimeout(() => setDots(dots + 1), 1000);
  }, [dots, setDots]);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(routeTree.SCREENS.ask.routerPath);
    }
    if (!isEmailVerificationPending) {
      router.replace(routeTree.ROOT.index.routerPath);
    }
  }, [router, isLoggedIn, isEmailVerificationPending]);

  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText type="subtitle">Waiting for Email Verification{'.'.repeat(dots % 4)}</ThemedText>
      <Br />
      <Button
        onPress={() => {
          cancelCreateUser();
          router.replace(routeTree.ROOT.index.routerPath);
        }}>
        Cancel
      </Button>
    </ThemedView>
  );
}
