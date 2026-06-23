import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { BottomSheetBackdropProps, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useTheme } from '@/core/hooks/useTheme';

export const BottomSheetBlurBackdrop: React.FC<BottomSheetBackdropProps> = ({
  animatedIndex,
  style,
}) => {
  const { isDark } = useTheme();
  const { dismiss } = useBottomSheetModal();

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <Animated.View
      style={[
        style,
        containerAnimatedStyle,
        { backgroundColor: 'transparent' },
      ]}
    >
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={() => dismiss()}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          tint="dark"
          intensity={50}
        />
        {/* Soft overlay matching iOS backdrop styling - darker blackish tone */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: isDark
                ? 'rgba(0, 0, 0, 0.75)'
                : 'rgba(0, 0, 0, 0.65)',
            },
          ]}
        />
      </Pressable>
    </Animated.View>
  );
};
