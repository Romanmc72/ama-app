import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { routeTree } from '@/constants/Routes';
import { useUserContext } from '@/contexts';

export default function ScreensLayout() {
  const { isLoggedIn } = useUserContext();

  if (!isLoggedIn) {
    return <Redirect href="/index" />;
  }

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
        <Drawer.Screen name="(list)" options={{ title: 'Lists' }} />
        <Drawer.Screen name="(user)" options={{ title: 'Settings' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
