import React, { useState } from 'react';
import { StyleProp, StyleSheet, TextStyle, useColorScheme } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { COMMON_COLORS } from '@/constants/Colors';

export interface GenericIconProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  /**
   * The action to execute when the "Shuffle" icon is pressed.
   * @returns nothing
   */
  onPress: () => void;
  /**
   * Whether or not the icon is enabled.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * An override color for the icon. Default themes will be used if not provided.
   */
  color?: string;
  /** Any style overrides */
  style?: StyleProp<TextStyle>;
}

export type IconInstanceProps = Pick<GenericIconProps, 'onPress' | 'disabled' | 'style'>;

export default function GenericIcon(props: GenericIconProps) {
  const [focused, setFocus] = useState(false);
  const focus = () => setFocus(true);
  const unFocus = () => setFocus(false);
  const theme = useColorScheme();
  const darkMode = theme === 'dark';
  const color = focused ? COMMON_COLORS.grey : darkMode ? COMMON_COLORS.white : COMMON_COLORS.black;
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      color: props.color ?? color,
    },
  });
  return (
    <Feather
      name={props.iconName}
      size={30}
      onPress={!props.disabled ? props.onPress : undefined}
      onFocus={focus}
      onPressIn={focus}
      onHoverIn={focus}
      onBlur={unFocus}
      onPressOut={unFocus}
      onHoverOut={unFocus}
      style={[styles.button, props.disabled && { opacity: 0.5 }, props.style]}
    />
  );
}
