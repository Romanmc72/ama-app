import { JSX, useEffect, useState } from 'react';
import Br from '@/components/Br';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { viewStyles } from '@/styles/view';
import { useLists } from '@/hooks/api/useList';
import { Href, Link } from 'expo-router';
import { routeTree } from '@/constants/Routes';
import { useUserContext } from '@/contexts';

export default function ViewList(): JSX.Element {
  const { user } = useUserContext();
  const { data, isLoading, isError, refetch } = useLists({ userId: user?.userId ?? '' });
  const [justReloaded, setJustReloaded] = useState(false);

  // TODO: Create a component for a list row
  const ListRow = ({ listName, listId }: { listName: string; listId: string }) => (
    <Link href={(routeTree.LIST.list.routerPath + '/' + listId) as Href}>{listName}</Link>
  );

  useEffect(() => {
    if (!isLoading && isError && !justReloaded) {
      refetch();
      setJustReloaded(true);
      const timer = setTimeout(() => {
        setJustReloaded(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isError, isLoading, justReloaded, refetch]);

  if (isLoading) {
    return (
      <ThemedView style={viewStyles.view}>
        <ThemedText type="title">Loading...</ThemedText>
      </ThemedView>
    );
  }
  if (isError) {
    return (
      <ThemedView style={viewStyles.view}>
        <ThemedText type="title">Could not load lists! Trying again...</ThemedText>
      </ThemedView>
    );
  }
  return (
    <ThemedView style={viewStyles.view}>
      {data?.length &&
        data.map((list) => (
          <ThemedView>
            <Br />
            <ListRow listId={list.listId} listName={list.name} />
          </ThemedView>
        ))}
      <ThemedText type="title">Could not load lists! Trying again...</ThemedText>
    </ThemedView>
  );
}
