import { JSX, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import Br from '@/components/Br';
import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';
import { auth } from '@/firebaseConfig';
import { useUserContext } from '@/contexts';
import { useUser } from '@/hooks';

export default function PasswordLogin(): JSX.Element {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { data: user, isError } = useUser({ userId });
  const { setUser } = useUserContext();

  useEffect(() => {
    console.log(`userId: ${userId}`);
    if (user) {
      setUser(user);
      router.replace(routeTree.SCREENS.ask.routerPath);
    }
    if (isError) {
      console.error('Error fetching user');
      setDisabled(false);
    }
  }, [isError, router, setUser, user, userId]);

  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText>Password Login</ThemedText>
      <Br />
      <Button
        onPress={async () => {
          const userCreds = await createUserWithEmailAndPassword(auth, 'test@test.com', 'test');
          setUserId(userCreds.user.uid);
          setDisabled(true);
        }}
        disabled={disabled}>
        {disabled ? 'Loading...' : 'Sign In'}
      </Button>
    </ThemedView>
  );
}
