import React from 'react';
import { View } from 'react-native';

/** The properties for creating appropriately spaced side-by-side buttons. */
export interface SideBySideButtonProps {
  /** The buttons to place on screen. */
  buttons: JSX.Element[];
}
/**
 * Renders multiple buttons horizontally. There is a limit to how many buttons
 * you can add before it looks crappy so keep that in mind.
 * @param props the properties to use for the side-by-side buttons
 * @return the buttons input, but side by side.
 */
export default function SideBySideButtons(props: SideBySideButtonProps): JSX.Element {
  const spacing = Math.round(25 / (props.buttons.length * 2));
  return (
    <View style={{ flexDirection: 'row' }}>
      {props.buttons.map((button) => (
        <View style={{ marginLeft: `${spacing}%`, marginRight: `${spacing}%` }}>{button}</View>
      ))}
    </View>
  );
}
