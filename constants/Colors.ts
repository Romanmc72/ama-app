/**
 * The hex codes corresponding to a color scheme.
 */
export type ColorScheme = {
  /**
   * The color of foreground objects.
   */
  foreground: string;
  /**
   * The color of background objects.
   */
  background: string;
  /**
   * The color of foreground objects when highlighted.
   */
  highlightedForeground: string;
  /**
   * The color of background objects when highlighted.
   */
  highlightedBackground: string;
};

/**
 * Some of the commonly available colors used throughout the app in various
 * color schemes.
 */
export const COMMON_COLORS: { [colorName: string]: string } = {
  grey: '#808080',
  darkGrey: '#303030',
  white: '#ECEDEE',
  black: '#151718',
  blue: '#0a7ea4',
  darkblue: '#133f60',
  purple: '',
};

export const Colors: { [name: string]: ColorScheme } = {
  light: {
    background: COMMON_COLORS.white,
    foreground: COMMON_COLORS.black,
    highlightedBackground: COMMON_COLORS.darkGrey,
    highlightedForeground: COMMON_COLORS.grey,
  },
  dark: {
    background: COMMON_COLORS.black,
    foreground: COMMON_COLORS.white,
    highlightedBackground: COMMON_COLORS.grey,
    highlightedForeground: COMMON_COLORS.darkGrey,
  },
  blue: {
    background: COMMON_COLORS.darkGrey,
    foreground: COMMON_COLORS.blue,
    highlightedBackground: COMMON_COLORS.white,
    highlightedForeground: COMMON_COLORS.darkblue,
  },
};
