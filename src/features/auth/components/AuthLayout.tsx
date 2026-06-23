import React from 'react';
import { View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useTheme } from '@/core/hooks/useTheme';
import { cn } from '@/utils/cn';

interface AuthLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, header, className }) => {
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();

  // Dynamic light/dark gradients for background depth matching onboarding
  const gradientColors = isDark
    ? ['rgba(0, 175, 102, 0.05)', '#181A20', '#181A20']
    : ['rgba(0, 175, 102, 0.08)', '#FFFFFF', '#FFFFFF'];

  const paddingTop = header ? insets.top + 8 : insets.top + 16;

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Decorative gradient overlay */}
      <LinearGradient
        colors={gradientColors as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.5 }}
        className="absolute inset-0"
      />

      {/* Fixed Header */}
      {header && (
        <View
          style={{
            paddingTop: insets.top + 10,
            paddingHorizontal: 24,
            zIndex: 10,
          }}
          className="bg-transparent"
        >
          {header}
        </View>
      )}

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        className="flex-1"
        bottomOffset={30} // Smooth extra space above the keyboard
      >
        <View
          className={cn('flex-1 px-8', className)}
          style={{
            minHeight: SCREEN_HEIGHT - (header ? insets.top + 70 : insets.top) - insets.bottom,
            paddingTop: header ? 16 : paddingTop,
            paddingBottom: Math.max(insets.bottom, 16) + 16,
          }}
        >
          {children}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
