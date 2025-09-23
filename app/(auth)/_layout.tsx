import { useUserContext } from '@/contexts';
import { Stack, useRouter } from 'expo-router';
import { routeTree } from '@/constants/Routes';
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

  return (
    <Stack>
      {Object.entries(routeTree.AUTH).map(([routeName, route]) => (
        <Stack.Screen
          key={route.path}
          name={routeName}
          options={{
            title: route.title,
          }}
        />
      ))}
    </Stack>
  );
}
