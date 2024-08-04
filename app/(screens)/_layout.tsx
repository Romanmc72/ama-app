import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { routeTree } from '@/constants/Routes';

export default function ScreensLayout() {
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
