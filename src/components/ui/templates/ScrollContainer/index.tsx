import React, { forwardRef, useState, useEffect } from 'react';
import { ScrollView, ScrollViewProps, Keyboard, Platform } from 'react-native';
import { useTabPadding } from '@/core/hooks/useTabPadding';
import { cn } from '@/utils/cn';

interface ScrollContainerProps extends ScrollViewProps {
  children: React.ReactNode;
  hasTabNavigation?: boolean; // If true, adds dynamic bottom padding for floating bottom tabs
  paddingBottomExtra?: number; // Additional extra bottom spacing when keyboard is closed
  horizontalPadding?: number; // Defaults to 20px (px-5)
  adjustPaddingForKeyboard?: boolean; // Dynamically increase padding when keyboard is visible
  keyboardPaddingExtra?: number; // Extra padding when keyboard is open
}

export const ScrollContainer = forwardRef<ScrollView, ScrollContainerProps>(
  (
    {
      children,
      hasTabNavigation = true,
      paddingBottomExtra = 4,
      horizontalPadding = 20,
      adjustPaddingForKeyboard = false,
      keyboardPaddingExtra = 180,
      contentContainerStyle,
      className,
      ...props
    },
    ref
  ) => {
    const { paddingBottom } = useTabPadding();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
      if (!adjustPaddingForKeyboard) return;

      const showListener = Keyboard.addListener(
        Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
        () => setKeyboardVisible(true)
      );
      const hideListener = Keyboard.addListener(
        Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
        () => setKeyboardVisible(false)
      );

      return () => {
        showListener.remove();
        hideListener.remove();
      };
    }, [adjustPaddingForKeyboard]);

    const activeExtraPadding = adjustPaddingForKeyboard && isKeyboardVisible
      ? keyboardPaddingExtra
      : paddingBottomExtra;

    return (
      <ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        className={cn('flex-1', className)}
        contentContainerStyle={[
          {
            paddingHorizontal: horizontalPadding,
            paddingBottom: hasTabNavigation ? paddingBottom + activeExtraPadding : activeExtraPadding,
            flexGrow: 1,
          },
          contentContainerStyle,
        ]}
        {...props}
      >
        {children}
      </ScrollView>
    );
  }
);

ScrollContainer.displayName = 'ScrollContainer';
