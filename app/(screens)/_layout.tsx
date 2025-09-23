import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { routeTree } from '@/constants/Routes';
import { useUserContext } from '@/contexts';
import { useEffect } from 'react';

export default function ScreensLayout() {
  const { isLoggedIn } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('You are NOT logged in, redirecting!');
      router.replace('/');
    }
  }, [isLoggedIn, router]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        {Object.values(routeTree.SCREENS).map((route) => (
          <Drawer.Screen
            aria-label={route.title}
            key={route.path}
            name={route.path}
            options={{
              drawerLabel: route.title,
              title: route.title,
            }}
          />
        ))}
        <Drawer.Screen name="list/(list)" options={{ title: 'Lists' }} />
        <Drawer.Screen name="user/(user)" options={{ title: 'Settings' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
