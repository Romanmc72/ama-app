import { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { routeTree } from '@/constants/Routes';
import { viewStyles } from '@/styles/view';
import { useUserContext } from '@/contexts';
import { Br, Button, ThemedView, ThemedInput, ThemedText } from '@/components';
import { DEFAULT_USER_ACCOUNT } from '@/constants/data';

type FormInput = {
  value: string;
  label: string;
  placeholder: string;
  setter: (v: string) => void;
  sensitive?: boolean;
};

export default function SignUp(): JSX.Element {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { createUser } = useUserContext();

  const InputWithLabel = (inp: FormInput) => (
    <View key={`${inp.label}-form-input`} style={{ width: '100%', alignItems: 'center' }}>
      <ThemedText key={`${inp.label}-label`} style={{ marginBottom: 10 }}>
        {inp.label}
      </ThemedText>
      <ThemedInput
        key={`${inp.label}-input`}
        style={{ marginBottom: 30 }}
        placeholder={inp.placeholder}
        value={inp.value}
        onChangeText={inp.setter}
        type={inp.sensitive ? 'password' : 'default'}
      />
    </View>
  );

  const inputs: FormInput[] = [
    {
      value: name,
      label: 'Name',
      placeholder: 'enter name',
      setter: setName,
    },
    {
      value: email,
      label: 'Email',
      placeholder: 'enter email',
      setter: setEmail,
    },
    {
      value: password,
      label: 'Password',
      placeholder: 'enter password',
      setter: setPassword,
      sensitive: true,
    },
    {
      value: confirmPassword,
      label: 'Confirm password',
      placeholder: 'reenter password',
      setter: setConfirmPassword,
      sensitive: true,
    },
  ];

  const handlePress = useCallback(async () => {
    console.log('He pushed me!');
    setLoading(true);
    try {
      await createUser({
        ...DEFAULT_USER_ACCOUNT,
        email,
        password,
        name,
      });
      router.replace(routeTree.AUTH.verifyEmail.routerPath);
      // in case something goes wrong with the routing, we will
      // stop it from saying it is loading forever
      setTimeout(() => setLoading(false), 10_000);
    } catch (error) {
      console.error('Error creating user:', error);
      setLoading(false);
    }
  }, [name, email, password, router, createUser]);

  // TODO: add invalid red border to inputs with message
  // TODO: fix scroll/focus when keyboard is open
  // TODO: add loading state to button
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <ThemedView style={[viewStyles.view, { width: '100%' }]}>
          {inputs.map((inp) => InputWithLabel(inp))}
          <Br />
          <Button
            disabled={password !== confirmPassword || !email || !password || loading}
            onPress={handlePress}>
            {loading ? 'Loading...' : 'Create account'}
          </Button>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
