import { TextProps, useColorScheme, View } from 'react-native';

import ThemedText from '@/components/ThemedText';
import Cancel from '@/components/Cancel';

export interface TagProps extends TextProps {
  color?: string;
  cancellable?: boolean;
  onCancel?: () => void;
}

export default function Tag({
  color = '#007bff',
  cancellable = false,
  onCancel = () => {},
  ...props
}: TagProps) {
  const theme = useColorScheme() ?? 'light';
  return (
    <View
      style={{
        backgroundColor: color,
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow:
          theme === 'light' ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(255, 255, 255, 0.4)',
      }}>
      <ThemedText {...props} />
      {cancellable && <Cancel onPress={onCancel} />}
    </View>
  );
}
