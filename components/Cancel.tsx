import { COMMON_COLORS } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

export interface CancelProps {
  /**
   * The action to execute when the "Like" icon is pressed.
   * @returns nothing
   */
  onPress: () => void;
  /**
   * Whether or not the icon is enabled.
   *
   * @default false
   */
  disabled?: boolean;
}

export default function Cancel(props: CancelProps) {
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
      name="x"
      size={30}
      onPress={props.onPress}
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
