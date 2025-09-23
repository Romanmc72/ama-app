import { JSX, useState, useEffect } from 'react';
import { Br, Button, ThemedInput, ThemedText, ThemedView } from '@/components';
import { viewStyles } from '@/styles/view';
import { useUserContext } from '@/contexts';

export default function PasswordLogin(): JSX.Element {
  const [disabled, setDisabled] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useUserContext();

  useEffect(() => {
    if (!disabled) return;
    setTimeout(() => {
      if (loadingDots.length >= 3) {
        setLoadingDots('');
        return;
      }
      setLoadingDots(loadingDots + '.');
    }, 500);
  }, [disabled, loadingDots]);

  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText type="subtitle">Password Login</ThemedText>
      <Br />
      <ThemedText>Email</ThemedText>
      <ThemedInput value={email} onChangeText={setEmail} />
      <Br />
      <ThemedText>Password</ThemedText>
      <ThemedInput value={password} onChangeText={setPassword} type="password" />
      <Br />
      <Button
        onPress={async () => {
          setDisabled(true);
          await logIn({ email, password });
          setTimeout(() => setDisabled(false), 5_000);
        }}
        disabled={disabled}>
        {disabled ? `Loading${loadingDots}` : 'Sign In'}
      </Button>
    </ThemedView>
  );
}
