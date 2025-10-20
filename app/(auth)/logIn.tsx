import { useEffect, useState } from 'react';
import { viewStyles } from '@/styles/view';
import { useUserContext } from '@/contexts';
import { Br, Button, SideBySideButtons, ThemedInput, ThemedText, ThemedView } from '@/components';

export default function LogIn() {
  const onSelectProvider = () => console.log('TODO: Set these up');
  const [disabled, setDisabled] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
      {error.length && <ThemedText style={{ color: 'red' }}>{error}</ThemedText>}
      <ThemedText>Email</ThemedText>
      <ThemedInput
        value={email}
        onChangeText={(t) => {
          setEmail(t);
          setError('');
        }}
      />
      <Br />
      <ThemedText>Password</ThemedText>
      <ThemedInput
        value={password}
        onChangeText={(t) => {
          setPassword(t);
          setError('');
        }}
        type="password"
      />
      <Br />
      <Button
        style={{ width: '78%' }}
        onPress={async () => {
          setDisabled(true);
          try {
            await logIn({ email, password });
          } catch (e) {
            setError('Something went wrong logging in!');
            setDisabled(false);
          }
        }}
        disabled={disabled}>
        {disabled ? `Loading${loadingDots}` : 'Sign In'}
      </Button>
      <Br />
      <ThemedText style={{ marginBottom: 10 }}>Sign in with</ThemedText>
      <SideBySideButtons
        buttons={[
          <Button key="google" onPress={onSelectProvider}>
            Google
          </Button>,
          <Button key="apple" onPress={onSelectProvider}>
            Apple
          </Button>,
        ]}
      />
    </ThemedView>
  );
}
