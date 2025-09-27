import { Href, Link } from 'expo-router';
import { Br, ThemedText, ThemedView } from '@/components';

export interface RowProps {
  href: Href;
  id: string;
  text: string;
}

export default function Row(props: RowProps) {
  return (
    <ThemedView>
      <Link href={props.href}>
        <Br />
        <ThemedText>{props.text}</ThemedText>
      </Link>
    </ThemedView>
  );
}
