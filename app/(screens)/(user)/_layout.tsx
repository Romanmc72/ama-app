import { routeTree } from '@/constants/Routes';
import { Stack } from 'expo-router';

export default function NestedScreenLayout() {
  return (
    <Stack>
      {Object.values(routeTree.USER).map((route) => (
        <Stack.Screen key={route.path} name={route.path} options={{ title: route.title }} />
      ))}
    </Stack>
  );
}
