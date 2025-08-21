import { DimensionValue, StyleSheet, TextInput, TextInputProps } from 'react-native';
import { ThemedProps } from './ThemedView';
import { useThemeColor } from '@/hooks';

export interface ThemedInputProps extends Omit<TextInputProps, 'secureTextEntry'>, ThemedProps {
  type?: 'default' | 'password';
}

export default function ThemedInput({
  darkColor,
  lightColor,
  style,
  type = 'default',
  ...props
}: ThemedInputProps): JSX.Element {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'foreground');
  return (
    <TextInput
      style={[
        { color },
        style,
        type === 'default' ? styles.default : undefined,
        type === 'password' ? styles.password : undefined,
      ]}
      {...props}
      secureTextEntry={type === 'password'}
    />
  );
}

// TODO: get this to work with the themes
const commonStyle = {
  width: '78%' as DimensionValue,
  height: 48,
  borderRadius: 8,
  paddingHorizontal: 16,
  borderWidth: 1,
  borderColor: '#fff',
};

const styles = StyleSheet.create({
  default: {
    ...commonStyle,
  },
  password: {
    ...commonStyle,
  },
});
