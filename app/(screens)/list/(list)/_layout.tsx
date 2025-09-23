import { routeTree } from '@/constants/Routes';
import { useUserContext } from '@/contexts';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function NestedScreenLayout() {
  const { isLoggedIn } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('You are NOT logged in, redirecting!');
      router.replace('/');
    }
  }, [isLoggedIn, router]);

  return (
    <Stack>
      {Object.values(routeTree.LIST).map((route) => (
        <Stack.Screen key={route.path} name={route.path} options={{ title: route.title }} />
      ))}
    </Stack>
  );
}
