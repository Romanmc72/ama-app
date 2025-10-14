import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LogBox } from 'react-native';
import { Stack } from 'expo-router';

import { routeTree } from '@/constants/Routes';
import { useColorScheme } from '@/hooks/useColorScheme';
import { UserProvider, FilterProvider } from '@/contexts';

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  if (__DEV__) {
    LogBox.ignoreLogs([
      // We expect a 404 error when looking to see if a question exists in a
      // list already or not. Ignoring these in dev as the error log box
      // appears directly over top of some critical UI elements.
      'API call failed with status: 404 -',
      'Error response from API: {"error":"Unable to find list question"}',
    ]);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <FilterProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              {Object.entries(routeTree.ROOT).map(([routeName, route]) => (
                <Stack.Screen
                  key={route.path}
                  name={routeName}
                  options={{
                    title: route.title,
                    headerShown: route.path !== routeTree.ROOT.index.path,
                  }}
                />
              ))}
              <Stack.Screen name="(screens)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ title: 'Getting started' }} />
              <Stack.Screen
                name="[questionId]/index"
                options={{
                  title: 'Add to list',
                  presentation: 'modal',
                }}
              />
              <Stack.Screen
                name="filter"
                options={{
                  title: 'Filter tags',
                  presentation: 'modal',
                }}
              />
            </Stack>
          </ThemeProvider>
        </FilterProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
