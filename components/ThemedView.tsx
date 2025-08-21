import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedProps = {
  lightColor?: string;
  darkColor?: string;
};

export type ThemedViewProps = ViewProps & ThemedProps;

export default function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
