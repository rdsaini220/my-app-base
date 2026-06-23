import React from 'react';
import { KeyboardAvoidingView, Platform, KeyboardAvoidingViewProps } from 'react-native';
import { cn } from '@/utils/cn';

interface KeyboardContainerProps extends KeyboardAvoidingViewProps {
  children: React.ReactNode;
  keyboardOffset?: number; // Optional custom offset
}

export const KeyboardContainer: React.FC<KeyboardContainerProps> = ({
  children,
  keyboardOffset,
  className,
  ...props
}) => {
  const defaultOffset = Platform.OS === 'ios' ? 88 : 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={cn('flex-1', className)}
      keyboardVerticalOffset={keyboardOffset ?? defaultOffset}
      {...props}
    >
      {children}
    </KeyboardAvoidingView>
  );
};
