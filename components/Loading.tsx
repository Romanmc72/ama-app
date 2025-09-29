import { COMMON_COLORS } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

export interface LoadingProps {
  /**
   * Whether or not the icon is enabled.
   *
   * @default false
   */
  disabled?: boolean;
}

export default function Loading(props: LoadingProps) {
  const [focused, setFocus] = useState(false);
  const focus = () => setFocus(true);
  const unFocus = () => setFocus(false);
  const theme = useColorScheme();
  const darkMode = theme === 'dark';
  // TODO: Make this dynamic with custom color schemes
  const color = focused ? COMMON_COLORS.grey : darkMode ? COMMON_COLORS.white : COMMON_COLORS.black;
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      color,
      // outlineColor: color,
    },
  });
  return (
    <Feather
      name="loader"
      size={30}
      onFocus={focus}
      onPressIn={focus}
      onHoverIn={focus}
      onBlur={unFocus}
      onPressOut={unFocus}
      onHoverOut={unFocus}
      style={[styles.button, props.disabled && { opacity: 0.5 }]}
    />
  );
}
