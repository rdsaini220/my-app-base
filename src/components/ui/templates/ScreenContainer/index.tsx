import React from 'react';
import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/core/hooks/useTheme';
import { cn } from '@/utils/cn';

interface ScreenContainerProps extends ViewProps {
  children: React.ReactNode;
  includeSafeArea?: boolean; // If true, adds top safe area padding (e.g. for screens without a Header)
  className?: string;
  horizontalPadding?: number; // Defaults to 0 since page-level contains full-bleed headers/tabs
  statusBarStyle?: 'light' | 'dark' | 'auto' | 'inverted'; // Optional override for status bar style
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  includeSafeArea = false,
  className,
  style,
  horizontalPadding = 0,
  statusBarStyle,
  ...props
}) => {
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();

  return (
    <View
      className={cn('flex-1 bg-background', className)}
      style={[
        {
          paddingHorizontal: horizontalPadding,
          paddingTop: includeSafeArea ? insets.top : 0,
        },
        style,
      ]}
      {...props}
    >
      <StatusBar style={statusBarStyle ?? (isDark ? 'light' : 'dark')} />
      {children}
    </View>
  );
};
