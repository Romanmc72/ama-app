import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from '@/constants/Routes';
import { useColorScheme } from '@/hooks/useColorScheme';

import { UserProvider, FilterProvider } from '@/contexts';

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
