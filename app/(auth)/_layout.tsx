import { useUserContext } from '@/contexts';
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function AuthLayout() {
  const { isLoggedIn } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      console.log('You are logged in, redirecting from AUTH!');
      router.replace('/ask');
    }
  }, [isLoggedIn, router]);

  return <Slot />;
}
