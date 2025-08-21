import { useUserContext } from '@/contexts';
import { Redirect, Stack } from 'expo-router';
import { routeTree } from '@/constants/Routes';

export default function AuthLayout() {
  const { isLoggedIn } = useUserContext();

  if (isLoggedIn) {
    return <Redirect href={'/ask'} />;
  }

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
