import { Text } from 'react-native';

/**
 * Emulates the html <br /> tag by adding in a line break.
 * @returns the line break character.
 */
export default function Br(): JSX.Element {
  return <Text>{'\n'}</Text>;
}
