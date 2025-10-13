import { COMMON_COLORS } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleProp, StyleSheet, TextStyle, useColorScheme } from 'react-native';

export interface LoadingProps {
  /**
   * Whether or not the icon is enabled.
   *
   * @default false
   */
  disabled?: boolean;
  style: StyleProp<TextStyle>;
}

function StaticLoadingIcon(props: LoadingProps) {
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
      style={[styles.button, props.disabled && { opacity: 0.5 }, props.style]}
    />
  );
}

const AnimatedIcon = Animated.createAnimatedComponent(StaticLoadingIcon);

export default function Loading() {
  // 1. Create a ref for the animated value
  const rotationAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 2. Create a continuous loop
    Animated.loop(
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true, // Important for performance
      }),
    ).start();
  }, [rotationAnim]);

  // 3. Map the animated value to a rotation string
  const rotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return <AnimatedIcon style={{ transform: [{ rotate: rotation }] }} />;
}
