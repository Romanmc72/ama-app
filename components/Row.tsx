import { Href, Link } from 'expo-router';
import Br from './Br';
import ThemedText from './ThemedText';
import ThemedView from './ThemedView';

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
