import { Href, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import ThemedText from './ThemedText';
import { Colors, ColorScheme } from '@/constants/Colors';

const BORDER_WIDTH = 1;
const BORDER_RADIUS = 8;

const stylesFn = (theme: ColorScheme) =>
  StyleSheet.create({
    listContainer: {
      marginHorizontal: 16,
      borderRadius: BORDER_RADIUS,
    },
    row: {
      borderTopWidth: 0,
      borderRightWidth: BORDER_WIDTH,
      borderLeftWidth: BORDER_WIDTH,
      borderBottomWidth: BORDER_WIDTH,
      borderColor: theme.foreground,
      backgroundColor: theme.background,
      paddingVertical: 12,
      paddingHorizontal: 16,
      flexDirection: 'row',
      width: '90%',
    },
    firstRow: {
      borderTopWidth: BORDER_WIDTH,
      borderTopLeftRadius: BORDER_RADIUS,
      borderTopRightRadius: BORDER_RADIUS,
    },
    lastRow: {
      borderBottomLeftRadius: BORDER_RADIUS,
      borderBottomRightRadius: BORDER_RADIUS,
      borderBottomWidth: BORDER_WIDTH,
    },
  });

interface RowLinkProps {
  href: Href;
  id: string;
  text: string;
  index: number;
  totalItems: number;
}

interface RowActionProps {
  onPress: () => void;
  id: string;
  text: string;
  index: number;
  totalItems: number;
}

export type RowProps = RowLinkProps | RowActionProps;

export default function Row(props: RowProps) {
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const styles = stylesFn(Colors[colorScheme]);
  const firstRow = props.index === 0;
  const lastRow = props.index === props.totalItems - 1;
  const pressAction = 'href' in props ? () => router.push(props.href) : props.onPress;
  return (
    <TouchableOpacity
      onPress={pressAction}
      style={[styles.row, firstRow && styles.firstRow, lastRow && styles.lastRow]}>
      <ThemedText style={{ width: '90%' }}>{props.text}</ThemedText>
    </TouchableOpacity>
  );
}
