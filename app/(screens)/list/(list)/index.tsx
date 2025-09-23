import { JSX, useEffect, useState } from 'react';
import { Br, ThemedText, ThemedView } from '@/components';
import { viewStyles } from '@/styles/view';
import { useLists } from '@/hooks/api/useList';
import { Href, Link } from 'expo-router';
import { routeTree } from '@/constants/Routes';
import { useUserContext } from '@/contexts';

export default function ViewList(): JSX.Element {
  const { user, idToken } = useUserContext();
  const { data, isLoading, isError, refetch } = useLists({
    userId: user?.firebaseId ?? '',
    idToken: idToken ?? '',
  });
  const [justReloaded, setJustReloaded] = useState(false);

  // TODO: Create a component for a list row
  const ListRow = ({ listName, listId }: { listName: string; listId: string }) => (
    <Link href={`/list/${listId}`}>
      <ThemedText>{listName}</ThemedText>
    </Link>
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
      <ThemedView key="loading" style={viewStyles.view}>
        <ThemedText type="title">Loading...</ThemedText>
      </ThemedView>
    );
  }
  if (isError) {
    return (
      <ThemedView key="no-lists" style={viewStyles.view}>
        <ThemedText type="title">Could not load lists! Trying again...</ThemedText>
      </ThemedView>
    );
  }
  return (
    <ThemedView key="question-list" style={viewStyles.view}>
      {data?.length &&
        data.map((list) => (
          <ThemedView key={list.listId}>
            <Br />
            <ListRow listId={list.listId} listName={list.name} />
          </ThemedView>
        ))}
    </ThemedView>
  );
}
