import { Pressable, StyleSheet, Text, useColorScheme } from 'react-native';
import { ThemedTextProps } from './ThemedText';
import { JSX, useState } from 'react';
import { COMMON_COLORS } from '@/constants/Colors';

/** The properties required for the clickable text. */
export type ButtonProps = Omit<ThemedTextProps, 'type'> & {
  /**
   * The action to execute when the button is pressed.
   * @returns nothing
   */
  onPress: () => void;
  /**
   * The action to execute when the button held.
   * @returns nothing
   */
  onHold?: () => void;
  /**
   * Whether or not the button is enabled.
   *
   * @default false
   */
  disabled?: boolean;
};

/**
 * Creates a button that looks good and will execute some action when clicked
 * and optionally another action when held.
 */
export default function Button(props: ButtonProps): JSX.Element {
  const [focused, setFocus] = useState(false);
  const focus = () => setFocus(true);
  const unFocus = () => setFocus(false);
  const theme = useColorScheme();
  const darkMode = theme === 'dark';
  // TODO: Make this dynamic with custom color schemes
  const backgroundColor = focused
    ? COMMON_COLORS.grey
    : darkMode
      ? COMMON_COLORS.white
      : COMMON_COLORS.black;
  const textColor = focused
    ? COMMON_COLORS.darkGrey
    : darkMode
      ? COMMON_COLORS.black
      : COMMON_COLORS.white;
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: textColor,
    },
  });
  return (
    <Pressable
      aria-label={`${props.children} button`}
      aria-disabled={props.disabled ?? false}
      aria-selected={focused}
      style={styles.button}
      disabled={props.disabled ?? false}
      onPress={props.onPress}
      onFocus={focus}
      onPressIn={focus}
      onHoverIn={focus}
      onLongPress={props.onHold}
      onBlur={unFocus}
      onPressOut={unFocus}
      onHoverOut={unFocus}>
      <Text style={styles.text}>{props.children}</Text>
    </Pressable>
  );
}
